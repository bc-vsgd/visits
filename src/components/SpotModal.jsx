// SPOT MODAL COMPONENT
// Displays main picture with button 'Open' and button 'Update' if user authenticated

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// MUI components
import {
  Box,
  Modal,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
// MUI icons
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
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
      <Modal open={open} onClose={handleClose} className="mx-auto font-roboto">
        <Card component="div" className="pb-4">
          <CardContent>
            <Box className="mx-auto w-[95%]  sm:w-[90%] md:w-4/5">
              <Box className="mb-1 flex justify-between  sm:mb-2  md:mb-3">
                <SpotModalButton
                  onClick={() => {
                    handleOpenModal(spot);
                  }}
                >
                  Open
                </SpotModalButton>
                <button
                  onClick={handleClose}
                  className="flex h-6 items-center justify-center rounded-lg border border-blue-500 bg-white sm:h-8 sm:w-8 md:h-10 md:w-10"
                >
                  <CloseIcon className=" text-sm text-blue-500  sm:text-xl md:text-2xl" />
                </button>
              </Box>
              <Typography className="  pb-1 text-2xl sm:pb-2 sm:text-3xl md:pb-3">
                {spot.title}
              </Typography>
            </Box>
          </CardContent>

          {spot.spot_image && (
            <div className="mx-auto w-[80%] sm:w-[70%] md:w-2/3  lg:ml-[200px] lg:w-1/2">
              <CardMedia
                component="img"
                image={spot.spot_image.secure_url}
                alt={spot.title}
              />
            </div>
          )}
          {userToken && (
            <div className=" mx-auto w-[95%] pt-2 sm:w-[90%] sm:pt-3  md:w-4/5 md:pt-4">
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
            </div>
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
