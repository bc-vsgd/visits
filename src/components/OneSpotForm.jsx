import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// MUI components
import { Box, Card, CardMedia, CardActions, Typography } from "@mui/material";
// MUI icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadIcon from "@mui/icons-material/Upload";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
// Components
import VisitFormTextField from "./VisitFormTextField";
import VisitFormButton from "./VisitFormButton";

const OneSpotForm = ({
  url,
  id,
  setIsLoading,
  dataLength,
  setDataLength,
  userToken,
}) => {
  // console.log("one spot form, dataLength: ", dataLength);
  // console.log("one spot form, userToken (props): ", userToken);
  const navigate = useNavigate();
  // state id: visit id
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([""]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          { headers: { "Content-Type": "multipart/form-data" } },
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
      <Box component="form" className="flex flex-col">
        <Typography className="pb-1  text-xl sm:pb-2 sm:text-2xl ">
          New spot
        </Typography>

        {/* Pictures */}
        <Box component="div" className="h-16 sm:h-20 ">
          <label for="visit-input-files">
            {/* <p className="  w-48 rounded-lg border-2 border-solid bg-gray-100 py-3 text-center font-roboto"> */}
            <p className=" w-24 rounded-lg border-2 border-solid px-2 py-2 text-center font-roboto sm:w-28 sm:text-lg ">
              Choose files
            </p>
          </label>
          <input
            id="visit-input-files"
            className="h-0 border border-solid opacity-0 "
            type="file"
            multiple
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
            <Box component="div">
              {Object.keys(files).map((fileKey, index) => {
                return (
                  <Card key={index}>
                    <CardMedia
                      className=" w-[25%]"
                      component="img"
                      alt="Picture"
                      image={URL.createObjectURL(files[fileKey])}
                    />
                    <CardActions className="flex justify-end">
                      <VisitFormButton
                        onClick={() => {
                          deleteFile(fileKey);
                        }}
                        startIcon={<DeleteIcon />}
                      />
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
        {/* Title, description, link */}
        <Box component="div" className=" flex flex-col">
          {/* Title */}
          <VisitFormTextField
            required={true}
            label="Title"
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage("");
            }}
          />
          {/* Description */}
          <VisitFormTextField
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
          <VisitFormTextField
            label="Link"
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
          {errorMessage && (
            <Box component="div" className=" flex items-center text-red-500">
              <WarningAmberIcon sx={{ fontSize: "24px" }} /> {errorMessage}
            </Box>
          )}
        </Box>
        <Box className="pt-2 sm:pt-3 md:pt-4">
          {/* Buttons: add the spot & register the visit*/}
          <VisitFormButton
            startIcon={<AddCircleIcon />}
            onClick={spotFormSubmit}
          >
            Add this spot
          </VisitFormButton>

          {dataLength > 0 && (
            <VisitFormButton
              startIcon={<UploadIcon />}
              onClick={() => {
                navigate(`/visit/${id}`, { state: { userToken: userToken } });
              }}
            >
              Close this visit
            </VisitFormButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OneSpotForm;
