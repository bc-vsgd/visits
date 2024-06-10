import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../components/Loader";
import SpotModalTextField from "../components/SpotModalTextField";
import SpotModalButton from "../components/SpotModalButton";
// MUI components
import { Box, Card, CardMedia, CardActions } from "@mui/material";
// MUI icons
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

const SpotUpdatePage = ({ url }) => {
  const location = useLocation();
  // console.log("length: ", location.state.spotsDataLength);
  const navigate = useNavigate();
  const { id } = useParams();
  // States
  const [isLoading, setIsLoading] = useState(true);
  // Selected pictures = object
  const [files, setFiles] = useState({});
  // Pictures retrieved from existing spot = main image + pictures array (= objects array)
  const [pictures, setPictures] = useState([]);
  // Image: main picture (= object)
  const [image, setImage] = useState(null);
  // console.log("image: ", image);
  // console.log("pictures: ", pictures);
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
        // console.log("submit, image: ", image);
        // console.log("submit, pictures: ", pictures);
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
        // console.log("submit, pics array: ", picsArray);
        formData.append("picsArray", JSON.stringify(picsArray));

        // Selected pictures
        if (Object.keys(files).length > 0) {
          // console.log("spot update, submit: selected files");
          for (const key in files) {
            if (Object.hasOwnProperty.call(files, key)) {
              formData.append("pictures", files[key]);
            }
          }
        }
        const { data } = await axios.put(
          `${url}/visit/spot/${id}/update`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        // console.log("Spot update, data: ", data);
        if (location.state) {
          navigate(`${location.state.from}`, {
            state: { userToken: location.state.userToken },
          });
        }
      } catch (error) {
        console.log("One spot update, error: ", error);
      }
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
    <Box component="div" className="mx-auto w-[1000px]">
      <Box component="form" className=" flex-col">
        {/* Pictures */}
        <Box component="div" className="flex-col">
          <label for="input-files">
            <p className="  w-48 rounded-lg border-2 border-solid bg-white py-3 text-center font-roboto">
              Choose files
            </p>
          </label>
          <input
            id="input-files"
            className="h-8 opacity-0"
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
                <CardActions className="flex justify-end">
                  <SpotModalButton
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setImage(null);
                    }}
                  ></SpotModalButton>
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
                      <CardActions className="flex justify-end">
                        <SpotModalButton
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setPictures((prev) => {
                              const newArr = [...prev];
                              if (newArr.length === 1) {
                                return [];
                              } else {
                                newArr.splice(index, 1);

                                return newArr;
                              }
                            });
                          }}
                        ></SpotModalButton>
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
                    <CardActions className="flex justify-end">
                      <SpotModalButton
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          deleteFile(fileKey);
                        }}
                      ></SpotModalButton>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>

        {/* Title, description, categories, link */}
        <Box component="div" className="flex flex-col">
          {/* Title */}
          <SpotModalTextField
            required={true}
            label="Title"
            value={title && title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage("");
            }}
          />
          {/* Description */}
          <SpotModalTextField
            multiline={true}
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
          <SpotModalTextField
            label="Link"
            value={link && link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </Box>

        {/* Buttons: update & delete the spot */}
        <Box>
          <SpotModalButton startIcon={<RefreshIcon />} onClick={spotFormSubmit}>
            Update this spot
          </SpotModalButton>
          {location.state && location.state.spotsDataLength > 1 && (
            <SpotModalButton
              startIcon={<DeleteIcon />}
              onClick={() => {
                const { data } = axios.delete(`${url}/visit/spot/${id}/delete`);
                if (location.state) {
                  navigate(location.state.from, {
                    state: { userToken: location.state.userToken },
                  });
                }
              }}
            >
              Delete this spot
            </SpotModalButton>
          )}
        </Box>
        <Box component="div">{errorMessage}</Box>
      </Box>
    </Box>
  );
};

export default SpotUpdatePage;
