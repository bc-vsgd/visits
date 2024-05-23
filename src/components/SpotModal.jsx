// SPOT MODAL COMPONENT
// Displays main picture with button 'Open' and button 'Update' if user authenticated

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// MUI components
import {
  Modal,
  Card,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
// Components
import SpotDisplayModal from "./SpotDisplayModal";

const SpotModal = ({
  open,
  handleClose,
  spot,
  // 3 props to update / delete if user authenticated
  userToken,
  visitId,
  spotsDataLength,
}) => {
  //   console.log("spot to display: ", spot);
  const navigate = useNavigate();
  const location = useLocation();
  // Spot display card <=> Spot update page: back to authenticated visit (=> update options)
  if (!userToken && location.state) {
    userToken = location.state.userToken;
  }
  //   States
  const [openModal, setOpenModal] = useState(false);
  // Modal handle functions
  const handleOpenModal = (spot) => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    spot && (
      <Modal open={open} onClose={handleClose}>
        <Card className="w-80" component="div">
          <CardContent>
            <Button
              onClick={() => {
                handleOpenModal(spot);
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
          {/* Click => Spot Display Modal: 4th version */}
          <SpotDisplayModal
            spot={spot}
            open={openModal}
            handleClose={handleCloseModal}
          />
        </Card>
      </Modal>
    )
  );
};

export default SpotModal;