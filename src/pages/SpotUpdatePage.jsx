import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../components/Loader";
// MUI components
import {
  Box,
  Input,
  Card,
  CardMedia,
  CardActions,
  Button,
  TextField,
} from "@mui/material";

const SpotUpdatePage = ({ url }) => {
  const { id } = useParams();
  // States
  const [isLoading, setIsLoading] = useState(true);
  // Selected pictures = object
  const [files, setFiles] = useState({});
  // Pictures retrieved from existing spot = main image + pictures array (= objects array)
  const [pictures, setPictures] = useState([]);
  // Image: main picture (= object)
  const [image, setImage] = useState(null);
  //
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([""]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  //
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/spot/${id}`);
        // console.log("spot update, data: ", data.data);
        const {
          title,
          categories,
          description,
          link,
          spot_image,
          spot_pictures,
        } = data.data;
        setTitle(title);
        setCategories(categories);
        setDescription(description);
        setLink(link);
        // console.log("pictures: ", spot_pictures);
        // console.log("image: ", spot_image);
        setImage(spot_image);
        setPictures(spot_pictures);
      } catch (error) {
        console.log("Spot update, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Form submit
  const spotFormSubmit = async (event) => {
    event.preventDefault();
    // Conditions: pictures + title
    if (
      (image || pictures.length > 0 || Object.keys(files).length > 0) &&
      title
    ) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categories", JSON.stringify(categories));
        formData.append("description", description);
        formData.append("link", link);

        // Pictures

        // Already existing pictures
        const picsArray = [];
        if (image) {
          picsArray.push(image);
        }
        if (pictures) {
          for (let i = 0; i < pictures.length; i++) {
            picsArray.push(pictures[i]);
          }
        }
        formData.append("picsArray", JSON.stringify(picsArray));

        // Selected pictures
        if (Object.keys(files).length > 0) {
          for (const key in files) {
            if (Object.hasOwnProperty.call(files, key)) {
              formData.append("pictures", files[key]);
            }
          }
        }

        const { data } = await axios.put(
          `${url}/visit/spot/${id}/update`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Spot update, data: ", data);
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box component="div">
      <Box component="form" className="flex-col h-[500px]">
        {/* Pictures */}
        <Box component="div" className="flex-col">
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
          {/* Display pictures of existing spot */}
          <Box className="flex">
            {/* Spot image = 1st picture */}
            {image && (
              <Card>
                <CardMedia
                  className="w-80"
                  component="img"
                  alt="Picture"
                  image={image.secure_url}
                />
                <CardActions>
                  <Button
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    X
                  </Button>
                </CardActions>
              </Card>
            )}

            {/* Spot pictures: other pictures */}
            <Box className="flex">
              {pictures &&
                pictures.map((picture, index) => {
                  return (
                    <Card key={picture.public_id}>
                      <CardMedia
                        className="w-80"
                        component="img"
                        alt="Picture"
                        image={picture.secure_url}
                      />
                      <CardActions>
                        <Button
                          onClick={() => {
                            setPictures((prev) => {
                              if (prev.length === 1) {
                                return [];
                              }
                              return prev.splice(index, 1);
                            });
                          }}
                        >
                          X
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
            </Box>
          </Box>
          {/* Display selected pictures (by the input) */}
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
            value={title && title}
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
            value={description && description}
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
            value={link && link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
          {/* Button: update the spot */}
          <Button className="h-8 w-24" onClick={spotFormSubmit}>
            Update this spot
          </Button>
        </Box>
        <Box component="div">{errorMessage}</Box>
      </Box>
      {/* Button: register the visit */}
      {/* {dataLength > 0 && (
        <Button
          className="h-8 w-24"
          onClick={() => {
            navigate(`/visit/${id}`);
          }}
        >
          Close this visit
        </Button>
      )} */}
    </Box>
  );
};

//   return <div>SpotUpdatePage</div>;
// };

export default SpotUpdatePage;
