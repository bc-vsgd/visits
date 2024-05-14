import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../components/Loader";
// import OneSpotModal from "../components/OneSpotModal/OneSpotModal";
import SpotDisplayModal from "../components/SpotDisplayModal";
// MUI components
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const VisitPage = ({ url }) => {
  const location = useLocation();
  const { id } = useParams();
  const [userToken, setUserToken] = useState("");
  const [visitData, setVisitData] = useState(null);
  const [spotsData, setSpotsData] = useState(null);
  const [isVisitLoading, setIsVisitLoading] = useState(true);
  const [isSpotsLoading, setIsSpotLoading] = useState(true);
  // Display modal: 1st version
  // const [isSpotModalVisible, setIsSpotModalVisible] = useState(false);
  // const [spotToDisplay, setSpotToDisplay] = useState(null);

  // Spot modal: states & functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        // console.log("visit page, spots: ", data.data);
        //   data.data: array of spots
        setSpotsData(data.data);
      } catch (error) {
        console.log("visit page, spots error: ", error);
        // alert("No spot for this visit ...");
      }
      setIsSpotLoading(false);
    };
    fetchData();
  }, []);

  return isVisitLoading || isSpotsLoading ? (
    <Loader />
  ) : (
    <Box component="main" className="relative">
      <Box component="div">{visitData.title}</Box>
      <Box component="div">
        {spotsData &&
          spotsData.map((spot, index) => {
            return (
              <Card className="w-80" component="div" key={index}>
                <CardContent>
                  <Button onClick={handleOpen}>Open</Button>
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
                <SpotDisplayModal
                  spot={spot}
                  open={open}
                  handleClose={handleClose}
                />

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
          })}
      </Box>
      {location.state && location.state.userToken === userToken && (
        <Box component="div">
          <Link
            to={`/visit/${id}/update`}
            state={{ visitData: visitData, spotsData: spotsData }}
          >
            Update this visit
          </Link>
        </Box>
      )}
      <Box component="div">
        <Link to="/visit/form">Create a visit</Link>
      </Box>
    </Box>
  );
};

export default VisitPage;
