import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../components/Loader";
import HomeVisitTitle from "../components/HomeVisitTitle";
import HomeVisitLink from "../components/HomeVisitLink";
// MUI components
import {
  CssBaseline,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

const HomePage = ({ url, userToken }) => {
  // 1st useEffect (data = user)
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  // 2nd useEffect (data = visits)
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get user data
  useEffect(
    () => {
      const fetchData = async () => {
        setIsUserLoading(true);
        try {
          if (userToken) {
            const { data } = await axios.get(`${url}/visits/author/author`, {
              headers: { authorization: userToken },
            });
            setUserData(data.data[0]);
            setUserId(data.data[0]._id);
          } else {
            setUserData(null);
            setUserId("");
          }
        } catch (error) {
          console.log("Home page, error: ", error);
        }
        // userToken or no userToken
        setIsUserLoading(false);
      };
      fetchData();
    },
    // Reload when log out
    [userToken],
  );

  // Get visits data
  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        if (!isUserLoading) {
          try {
            if (userToken) {
              if (userId) {
                const { data } = await axios.get(`${url}/visits/${userId}`);
                // console.log("home page, fetch 2, data: ", data);
                setData(data);
              }
            } else {
              const { data } = await axios.get(`${url}/visits`);
              // console.log("home page, fetch 2, data: ", data);
              setData(data);
            }
          } catch (error) {
            console.log("Home page, error: ", error);
          }
          setIsLoading(false);
        }
      };
      fetchData();
    },
    // Reload when log out
    [isUserLoading, userToken, userId],
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Box component="main" className="container mx-auto w-[1000px] font-roboto">
      <CssBaseline />
      <Box component="div">
        {/* No visit */}
        {data.foundVisits.length === 0 ? (
          <HomeVisitTitle>
            <span>NO VISIT YET</span>
          </HomeVisitTitle>
        ) : // Visits & user logged
        userId ? (
          <Box component="div">
            {/* User's visits */}
            {data.authorVisits.length > 0 && (
              <Box component="div">
                <HomeVisitTitle>
                  <span>MY VISITS</span>
                </HomeVisitTitle>
                <Box component="div">
                  {data.authorVisits.map((visit, index) => {
                    return (
                      <Box component="div" key={index}>
                        <HomeVisitLink
                          to={`/visit/${visit._id}`}
                          state={{ userToken: userToken }}
                        >
                          <span>{visit.title}</span>
                          <span>{visit.author.username}</span>
                        </HomeVisitLink>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* User logged: other visits */}
            <HomeVisitTitle>
              <span>VISITS</span>
            </HomeVisitTitle>
            <Box component="div">
              {data.otherVisits.map((visit, index) => {
                return (
                  <Box component="div" key={index}>
                    <HomeVisitLink to={`/visit/${visit._id}`}>
                      <span>{visit.title}</span>
                      <span>{visit.author.username}</span>
                    </HomeVisitLink>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ) : (
          //
          // User logged out: all visits
          <Box component="div">
            <HomeVisitTitle>
              <span>VISITS</span>
            </HomeVisitTitle>
            <Box component="div">
              {data.foundVisits.map((visit, index) => {
                return (
                  <Box component="div" key={index}>
                    <HomeVisitLink to={`/visit/${visit._id}`}>
                      <span>{visit.title}</span>
                      <span>{visit.author.username}</span>
                    </HomeVisitLink>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
        {/* Link to create a visit page */}
        <Box className="flex justify-end">
          <Link to="/visit/form" className="no-underline">
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              size="large"
              className="text-lg"
            >
              <Typography>Create a new visit</Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
