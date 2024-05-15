// Spot modal: displays pictures (etc...) of a spot

// React
import { useState, useEffect } from "react";
// MUI components
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
// Style
const modalBoxStyle = {
  position: "absolute",
  top: "10%",
  left: "30%",
};

const SpotDisplayModal = ({ spot, open, handleClose }) => {
  // States
  const [imgIndex, setImgIndex] = useState(0);
  const [imgToDisplay, setImgToDisplay] = useState("");
  // console.log("spot display modal, spot: ", spot);
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
          width: "40%",
          height: 700,
        }}
      >
        <CardContent>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            X
          </Button>
          <Box component="div">
            <Typography>{spot.title}</Typography>
            {picsArray.length > 1 && (
              <Button
                onClick={() => {
                  changePicture("-");
                }}
              >
                -
              </Button>
            )}
            <CardMedia component="img" image={imgToDisplay} alt={spot.title} />
            {picsArray.length > 1 && (
              <Button
                onClick={() => {
                  changePicture("+");
                }}
              >
                +
              </Button>
            )}
            <Typography>{spot.description}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default SpotDisplayModal;
