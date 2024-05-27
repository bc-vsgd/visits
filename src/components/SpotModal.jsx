// SPOT MODAL COMPONENT
// Displays main picture with button 'Open' and button 'Update' if user authenticated

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// MUI components
import { Modal, Card, CardContent, Typography, CardMedia } from "@mui/material";
// MUI icons
import RefreshIcon from "@mui/icons-material/Refresh";

// Components
import SpotDisplayModal from "./SpotDisplayModal";
import SpotModalButton from "./SpotModalButton";

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
      <Modal open={open} onClose={handleClose} className="mx-auto w-[800px]">
        <Card component="div">
          <CardContent>
            <SpotModalButton
              onClick={() => {
                handleOpenModal(spot);
              }}
            >
              Open
            </SpotModalButton>
            <Typography variant="h5" component="div">
              {spot.title}
            </Typography>
          </CardContent>

          {spot.spot_image && (
            <CardMedia
              component="img"
              image={spot.spot_image.secure_url}
              alt={spot.title}
            />
          )}
          <CardContent>
            {spot.description && <Typography>{spot.description}</Typography>}
            {spot.link && (
              <Link to={spot.link} target="_blank">
                {spot.title}
              </Link>
            )}
          </CardContent>
          {userToken && (
            <SpotModalButton
              startIcon={<RefreshIcon />}
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
            </SpotModalButton>
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
