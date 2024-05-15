// Spot card: displays card + opens spot modal

import { useState } from "react";
// MUI components
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
// Components
import SpotDisplayModal from "./SpotDisplayModal";

const SpotDisplayCard = ({ spot }) => {
  // States
  const [open, setOpen] = useState(false);
  const [spotToDisplay, setSpotToDisplay] = useState(null);
  // Handle functions
  const handleOpen = (spot) => {
    setSpotToDisplay(spot);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className="w-80" component="div">
      <CardContent>
        <Button
          onClick={() => {
            handleOpen(spot);
          }}
        >
          Open
        </Button>
        <Typography component="div">{spot.title}</Typography>
      </CardContent>

      {spot.spot_image && (
        <CardMedia
          component="img"
          image={spot.spot_image.secure_url}
          alt={spot.title}
        />
      )}
      {/* Click => display Spot Modal: 4th version */}
      {spotToDisplay && (
        <SpotDisplayModal
          spot={spotToDisplay}
          open={open}
          handleClose={handleClose}
        />
      )}

      {/* Click => display Modal: 1st version */}
      {/* onClick={() => {
      setIsSpotModalVisible(!isSpotModalVisible);
      // console.log("visit page, clic on spot div, spot: ", spot);
      setSpotToDisplay(spot);
    }} */}
      {/* Click => display Modal: 1st version */}
      {/* {isSpotModalVisible && (
    <OneSpotModal
      spot={spotToDisplay}
      setIsSpotModalVisible={setIsSpotModalVisible}
    />
  )} */}
    </Card>
  );
};

export default SpotDisplayCard;
