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
      className="mx-auto font-roboto"
    >
      <Card className="pb-4">
        {/*  */}
        <CardContent>
          <Box className="mx-auto w-[95%]  sm:w-[90%] md:w-4/5">
            <Box className="mb-1 flex justify-between  sm:mb-2  md:mb-3">
              <Typography className="  pb-1 text-2xl sm:pb-2 sm:text-3xl md:pb-3">
                {spot.title}
              </Typography>
              <button
                onClick={handleClose}
                className="flex h-6 items-center justify-center rounded-lg border border-blue-500 bg-white sm:h-8 sm:w-8 md:h-10 md:w-10"
              >
                <CloseIcon className=" text-sm text-blue-500  sm:text-xl md:text-2xl" />
              </button>
            </Box>
          </Box>
          {/*  */}
          <Box className="mx-auto flex w-[80%] gap-x-2 sm:w-[70%] md:w-2/3 lg:ml-[200px] lg:w-1/2">
            {picsArray.length > 1 && (
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => {
                    changePicture("-");
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 bg-white sm:h-8 sm:w-8 md:h-10 md:w-10"
                >
                  <ChevronLeftIcon className=" text-sm text-blue-500  sm:text-xl md:text-2xl" />
                </button>
              </div>
            )}
            <div className="mx-auto">
              <CardMedia
                component="img"
                image={imgToDisplay}
                alt={spot.title}
              />
            </div>
            {picsArray.length > 1 && (
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => {
                    changePicture("-");
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 bg-white sm:h-8 sm:w-8 md:h-10 md:w-10"
                >
                  <ChevronRightIcon className=" text-sm text-blue-500  sm:text-xl md:text-2xl" />
                </button>
              </div>
            )}
          </Box>
          {/*  */}
          <Box className=" mx-auto w-[95%] pt-2 sm:w-[90%] sm:pt-3  md:w-4/5 md:pt-4">
            {spot.description && <Typography>{spot.description}</Typography>}
            {spot.link && (
              <Link to={spot.link} target="_blank">
                {spot.title}
              </Link>
            )}
          </Box>
        </CardContent>
        {/*  */}
      </Card>
    </Modal>
  );
};

export default SpotDisplayModal;
