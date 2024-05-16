import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// MUI components
import {
  Box,
  Button,
  TextField,
  Card,
  CardMedia,
  CardActions,
  Input,
} from "@mui/material";

const OneSpotForm = ({ url, id, setIsLoading, dataLength, setDataLength }) => {
  // console.log("one spot form, dataLength: ", dataLength);
  const navigate = useNavigate();
  // state id: visit id
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([""]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("categories: ", categories.length);

  // Form submit
  const spotFormSubmit = async (event) => {
    event.preventDefault();
    // Conditions: pictures + title
    if (Object.keys(files).length > 0 && title) {
      // Spots form page: loader display
      setIsLoading(true);

      try {
        // console.log("form submit, categories: ", categories);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categories", JSON.stringify(categories));
        formData.append("description", description);
        formData.append("link", link);

        for (const key in files) {
          if (Object.hasOwnProperty.call(files, key)) {
            formData.append("pictures", files[key]);
          }
        }

        const { data } = await axios.post(
          `${url}/visit/${id}/spot/create`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("One spot comp, data: ", data);
        setDataLength((prev) => {
          return prev + 1;
        });
      } catch (error) {
        console.log("One spot form comp, error: ", error);
      }
      // Reset form
      setFiles({});
      setTitle("");
      setCategories([]);
      setDescription("");
      setLink("");
    } else {
      if (Object.keys(files).length === 0) {
        setErrorMessage("This spot must have pictures");
      } else if (!title) {
        setErrorMessage("This spot must have a title");
      }
    }
  };

  // Delete a selected picture
  const deleteFile = (fileKey) => {
    const filesCopy = {};
    const filesArray = Object.entries(files);
    filesArray.splice(fileKey, 1);
    for (let i = 0; i < filesArray.length; i++) {
      filesCopy[i] = filesArray[i][1];
    }
    setFiles(filesCopy);
  };

  return (
    <Box component="div">
      <Box component="form" className="flex-col ">
        {/* Pictures */}
        <Box component="div">
          <Input
            inputProps={{
              multiple: true,
            }}
            className="h-8"
            type="file"
            onChange={(event) => {
              // Pictures already selected: add new pictures
              if (Object.entries(files).length > 0) {
                const filesCopy = {};
                const filesArray = Object.entries(files);
                const selectedFiles = Object.entries(event.target.files);
                filesArray.push(...selectedFiles);
                for (let i = 0; i < filesArray.length; i++) {
                  filesCopy[i] = filesArray[i][1];
                }
                setFiles(filesCopy);
              } else {
                // No picture selected yet
                setFiles(event.target.files);
              }
              setErrorMessage("");
            }}
          />
          {/* Display pictures */}
          {Object.keys(files).length !== 0 && (
            <Box component="div" className="flex">
              {Object.keys(files).map((fileKey, index) => {
                return (
                  <Card key={index}>
                    <CardMedia
                      className="w-80"
                      component="img"
                      alt="Picture"
                      image={URL.createObjectURL(files[fileKey])}
                    />
                    <CardActions>
                      <Button
                        onClick={() => {
                          deleteFile(fileKey);
                        }}
                      >
                        X
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>

        <Box component="div" className="flex">
          {/* Title */}
          <TextField
            required
            className="h-8"
            variant="standard"
            label="Title"
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage("");
            }}
          />
          {/* Description */}
          <TextField
            className="h-8"
            variant="standard"
            label="Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          {/* Categories */}
          {/* <Box component="div" className="flex-col">
            {categories.map((category, index) => {
              return (
                <Box component="div" key={index}>
                  <Box component="div" className="flex">
                    <TextField
                      className="h-8"
                      variant="standard"
                      label={`Categories: ${index}`}
                      defaultValue={categories[index]}
                      onChange={(event) => {
                        const arr = [...categories];
                        arr[index] = event.target.value;
                        setCategories(arr);
                      }}
                    />
                    <Button
                      className="h-8 w-24"
                      onClick={() => {
                        const arr = [...categories];
                        arr.push("");
                        setCategories(arr);
                      }}
                    >
                      Add category
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box> */}
          {/* Link */}
          <TextField
            variant="standard"
            className="h-8"
            label="Link"
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </Box>
        {/* Button: add the spot */}
        <Button className="h-8 w-24" onClick={spotFormSubmit}>
          Add this spot
        </Button>
        <Box component="div">{errorMessage}</Box>
      </Box>
      {/* Button: register the visit */}
      {dataLength > 0 && (
        <Button
          className="h-8 w-24"
          onClick={() => {
            navigate(`/visit/${id}`);
          }}
        >
          Close this visit
        </Button>
      )}
    </Box>
  );
};

export default OneSpotForm;
