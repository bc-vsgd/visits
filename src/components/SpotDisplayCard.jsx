// Spot card: displays card + opens spot modal + button to update the spot

import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

const SpotDisplayCard = ({ spot, userToken, visitId, spotsDataLength }) => {
  // console.log("spot card, userToken: ", userToken);
  // console.log("spot display card, visit id: ", useParams());
  // console.log("spot display card, visit id: ", visitId);
  const navigate = useNavigate();
  const location = useLocation();
  // Spot display card <=> Spot update page: back to authenticated visit (=> update options)
  if (!userToken && location.state) {
    userToken = location.state.userToken;
  }
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
      {userToken && (
        <Button
          onClick={() => {
            navigate(`/visit/spot/${spot._id}/update`, {
              state: {
                from: `/visit/${visitId}`,
                userToken: userToken,
                spotsDataLength: spotsDataLength,
              },
            });
          }}
        >
          Update this spot
        </Button>
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
