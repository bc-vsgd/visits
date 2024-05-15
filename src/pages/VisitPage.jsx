// Visit page: displays spots cards

// React
import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// Packages
import axios from "axios";
// Components
import Loader from "../components/Loader";
import SpotDisplayCard from "../components/SpotDisplayCard";
// MUI components
import { Box } from "@mui/material";

const VisitPage = ({ url }) => {
  const location = useLocation();
  const { id } = useParams();
  const [userToken, setUserToken] = useState("");
  const [visitData, setVisitData] = useState(null);
  const [spotsData, setSpotsData] = useState(null);
  const [isVisitLoading, setIsVisitLoading] = useState(true);
  const [isSpotsLoading, setIsSpotLoading] = useState(true);

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
            return <SpotDisplayCard key={index} spot={spot} />;
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
