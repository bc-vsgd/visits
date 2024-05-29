// Spot modal: displays pictures (etc...) of a spot

// React
import { useState, useEffect } from "react";
// MUI components
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
// MUI icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

// Components
import SpotModalButton from "./SpotModalButton";
// Style
const modalBoxStyle = {
  position: "absolute",
  top: "10%",
  left: "25%",
};

const SpotDisplayModal = ({ spot, open, handleClose }) => {
  // States
  const [imgIndex, setImgIndex] = useState(0);
  const [imgToDisplay, setImgToDisplay] = useState("");
  console.log("spot display modal, spot: ", spot);
  // Get all pictures in a single array
  let picsArray = [];
  picsArray.push(spot.spot_image.secure_url);
  if (spot.spot_pictures) {
    for (let i = 0; i < spot.spot_pictures.length; i++) {
      picsArray.push(spot.spot_pictures[i].secure_url);
    }
  }

  useEffect(() => {
    const displayImg = () => {
      setImgToDisplay(picsArray[imgIndex]);
      // console.log("use effect, picsArray[ind]: ", picsArray[imgIndex]);
    };
    displayImg();
  }, [imgIndex]);

  // Carousel buttons actions
  const changePicture = (action) => {
    if (action === "+") {
      if (imgIndex === picsArray.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex((prev) => prev + 1);
      }
    } else if (action === "-") {
      if (imgIndex === 0) {
        setImgIndex(picsArray.length - 1);
      } else {
        setImgIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Card
        sx={{
          ...modalBoxStyle,
          bgcolor: "white",
          width: "50%",
          height: 800,
        }}
      >
        <CardContent>
          <Box className="flex justify-end">
            <SpotModalButton
              onClick={() => {
                handleClose();
              }}
              startIcon={<CloseIcon />}
            />
          </Box>
          <Box component="div">
            <Typography>{spot.title}</Typography>
            <Box className="flex">
              {picsArray.length > 1 && (
                <SpotModalButton
                  onClick={() => {
                    changePicture("-");
                  }}
                  startIcon={<ChevronLeftIcon />}
                />
              )}
              <CardMedia
                component="img"
                image={imgToDisplay}
                alt={spot.title}
                className="w-[700px]"
              />
              {picsArray.length > 1 && (
                <SpotModalButton
                  onClick={() => {
                    changePicture("+");
                  }}
                  startIcon={<ChevronRightIcon />}
                />
              )}
            </Box>
            <CardContent>
              {spot.description && <Typography>{spot.description}</Typography>}
              {spot.link && (
                <Link to={spot.link} target="_blank">
                  {spot.title}
                </Link>
              )}
            </CardContent>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default SpotDisplayModal;
