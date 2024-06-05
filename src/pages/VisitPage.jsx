// Visit page: displays visit title and spots cards
// If author authenticated: possibility to update (title, spots), add (spots) and delete (spots, visit)
// 1st useEffect: gets visit data
// 2nd useEffect: gets spots data

// React
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// Packages
import axios from "axios";
// Leaflet components
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  CircleMarker,
} from "react-leaflet";
// MUI components
import { Box, Button, Typography } from "@mui/material";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import RefreshIcon from "@mui/icons-material/Refresh";
// Components
import Loader from "../components/Loader";
import VisitPageButton from "../components/VisitPageButton";
import VisitPageLink from "../components/VisitPageLink";
// Modal component
import SpotModal from "../components/SpotModal";

const VisitPage = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  // States
  const [userToken, setUserToken] = useState("");
  const [visitData, setVisitData] = useState(null);
  const [spotsData, setSpotsData] = useState(null);
  const [isVisitLoading, setIsVisitLoading] = useState(true);
  const [isSpotsLoading, setIsSpotLoading] = useState(true);
  //
  const centerCoords = [48.86, 2.33];
  // Modal: states & functions
  const [open, setOpen] = useState(false);
  const [spotToDisplay, setSpotToDisplay] = useState(null);
  const handleOpen = (spot) => {
    setSpotToDisplay(spot);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 1st version component (with useMap())
  // const UserLocationMarker = () => {
  //   const [position, setPosition] = useState(null);
  //   const map = useMap();
  //   map.locate().on("locationfound", function (event) {
  //     setPosition(event.latlng);
  //   });
  //   return position === null ? null : (
  //     <CircleMarker center={position}></CircleMarker>
  //   );
  // };

  // 2nd version component (with navigator.geolocation)
  const UserLocationMarker = () => {
    const [position, setPosition] = useState(null);

    console.log("user location marker comp");

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`latitude: ${latitude}, longitude: ${longitude}`);
      setPosition({ latitude, longitude });
    };

    const error = () => {
      console.log("Unable to retrieve your geolocation");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else console.log("Geolocation not supported");

    return position === null ? null : (
      <CircleMarker
        center={[position.latitude, position.longitude]}
      ></CircleMarker>
    );
  };

  // 1st use effect: get visit data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visits/visit/${id}`);
        // console.log("visit page, data: ", data.data[0].author.token);
        // data.data[0]: found visit
        setVisitData(data.data[0]);
        setUserToken(data.data[0].author.token);
      } catch (error) {
        console.log("Visit page, visit data error: ", error);
      }
      setIsVisitLoading(false);
    };
    fetchData();
  }, []);

  // 2nd use effect: get spots data of this visit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        // console.log("visit page, spots: ", data.data);
        //   data.data: array of spots
        setSpotsData(data.data);
      } catch (error) {
        console.log("visit page, spots error: ", error);
      }
      setIsSpotLoading(false);
    };
    fetchData();
  }, []);

  return isVisitLoading || isSpotsLoading ? (
    <Loader />
  ) : (
    <Box
      component="main"
      className=" mx-auto w-[95%] font-roboto sm:w-[90%] md:w-4/5"
    >
      <Box component="div" className="  ">
        <Typography className="  pb-1 text-2xl sm:pb-2 sm:text-3xl md:pb-3">
          {visitData.title}
        </Typography>
        {visitData.city && (
          <Typography className="  pb-1 text-xl sm:pb-2 sm:text-2xl md:pb-3 ">
            {visitData.city}
          </Typography>
        )}
      </Box>

      {visitData.description && (
        <Typography className=" pb-3 text-sm  sm:text-base md:pb-5">
          {visitData.description}
        </Typography>
      )}

      <MapContainer
        className="visit-page-map"
        center={centerCoords}
        zoom={12}
        scrollWheelZoom={true}
      >
        <UserLocationMarker />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spotsData.map((spot) => {
          return (
            <Marker
              eventHandlers={{
                click: () => {
                  handleOpen(spot);
                },
              }}
              key={spot._id}
              position={[spot.coords.latitude, spot.coords.longitude]}
            >
              {/* Modal */}
              {/* If user is the author => can update the spots */}
              {spotsData &&
              location.state &&
              location.state.userToken === userToken ? (
                <SpotModal
                  open={open}
                  handleClose={handleClose}
                  spot={spotToDisplay}
                  userToken={userToken}
                  visitId={id}
                  spotsDataLength={spotsData.length}
                />
              ) : (
                // User not authenticated => can only read the visit
                spotsData && (
                  <SpotModal
                    open={open}
                    handleClose={handleClose}
                    spot={spotToDisplay}
                  />
                )
              )}
            </Marker>
          );
        })}
      </MapContainer>

      {/* Visit description */}

      {/* Author authenticated => possibility to update & delete the visit, and to add a spot */}
      {location.state && location.state.userToken === userToken && (
        <Box
          component="div"
          className="flex justify-between pt-2 sm:pt-3 md:pt-4"
        >
          <VisitPageLink
            to={`/visit/${id}/update`}
            state={{ userToken: userToken }}
          >
            <VisitPageButton startIcon={<RefreshIcon />}>
              Update
            </VisitPageButton>
          </VisitPageLink>
          <VisitPageButton
            onClick={() => {
              const { data } = axios.delete(`${url}/visits/visit/${id}/delete`);
              navigate("/");
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </VisitPageButton>
          <VisitPageButton
            onClick={() => {
              navigate(`/visit/form/${id}/spots`, {
                state: {
                  title: visitData.title,
                  city: visitData.city,
                  details: visitData.city_details,
                  userToken: userToken,
                },
              });
            }}
            startIcon={<AddLocationIcon />}
          >
            Add a spot
          </VisitPageButton>
        </Box>
      )}

      {/* Create a visit (authenticated or not) */}
      <Box component="div" className="flex justify-end pt-2 sm:pt-3 md:pt-4">
        <VisitPageLink to="/visit/form">
          <VisitPageButton startIcon={<AddCircleIcon />}>
            Create a new visit
          </VisitPageButton>
        </VisitPageLink>
      </Box>
    </Box>
  );
};

export default VisitPage;
