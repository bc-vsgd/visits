// Visit page: displays visit title and spots cards
// If author authenticated: possibility to update (title, spots), add (spots) and delete (spots, visit)
// 1st useEffect: gets visit data
// 2nd useEffect: gets spots data

// React
import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
// Packages
import axios from "axios";
// Components
import Loader from "../components/Loader";
import SpotDisplayCard from "../components/SpotDisplayCard";
// MUI components
import { Box, Button } from "@mui/material";

const VisitPage = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [userToken, setUserToken] = useState("");
  // console.log("Visit page, userToken (state): ", userToken);
  // if (location.state) {
  //   console.log("Visit page, userToken (location): ", location.state.userToken);
  // }
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
      }
      setIsSpotLoading(false);
    };
    fetchData();
  }, []);

  return isVisitLoading || isSpotsLoading ? (
    <Loader />
  ) : (
    <Box component="main" className="font-roboto relative">
      <Box component="div" className="flex">
        <Box component="div">{visitData.title}</Box>
        {/* Author authenticated => possibility to update */}
        {location.state && location.state.userToken === userToken && (
          <>
            <Link to={`/visit/${id}/update`} state={{ userToken: userToken }}>
              <Button>Update visit title</Button>
            </Link>
            <Button
              onClick={() => {
                const { data } = axios.delete(
                  `${url}/visits/visit/${id}/delete`
                );
                navigate("/");
              }}
            >
              Delete this visit
            </Button>
          </>
        )}
      </Box>
      <Box component="div">
        {/* If user is the author => can update the spots */}
        {spotsData && location.state && location.state.userToken === userToken
          ? spotsData.map((spot, index) => {
              return (
                <SpotDisplayCard
                  key={index}
                  spot={spot}
                  userToken={userToken}
                  visitId={id}
                  spotsDataLength={spotsData.length}
                />
              );
            })
          : // If user can only read the visit
            spotsData &&
            spotsData.map((spot, index) => {
              return <SpotDisplayCard key={index} spot={spot} />;
            })}
      </Box>
      {/* Author authenticated => possibility to add a spot */}
      {location.state && location.state.userToken === userToken && (
        <Button
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
        >
          Add a spot
        </Button>
      )}
      <Box component="div">
        <Link to="/visit/form">Create a visit</Link>
      </Box>
    </Box>
  );
};

export default VisitPage;
