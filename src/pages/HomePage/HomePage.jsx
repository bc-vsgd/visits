import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../../components/Loader/Loader";

const HomePage = ({ url, userToken }) => {
  // 1st useEffect (data = user)
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  // 2nd useEffect (data = visits)
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("home page, user token: ", userToken);

  // Get user data
  useEffect(
    () => {
      const fetchData = async () => {
        // console.log("home page, fetch 1");
        setIsUserLoading(true);
        try {
          if (userToken) {
            const { data } = await axios.get(`${url}/visits/author/author`, {
              headers: { authorization: userToken },
            });
            // console.log("home page, fetch 1, user data: ", data.data[0]);
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
    [userToken]
  );

  // Get visits data
  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        if (!isUserLoading) {
          // console.log("fetchData user");
          // console.log("fetch 2: user id: ", userId);
          // console.log("fetch 2: user loading: ", isUserLoading);
          // console.log("fetch 2: user token: ", userToken);
          try {
            // console.log("fetch 2: try: user token: ", userToken);
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
    [isUserLoading, userToken, userId]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Home Page</h1>

      <div>
        {/* If user logged: his/her visits */}
        {userId ? (
          <div>
            <h2>YOUR VISITS</h2>

            <div>
              {data.authorVisits.map((visit, index) => {
                return (
                  <div key={index}>
                    <p>
                      {visit.title} - {visit._id}
                    </p>
                  </div>
                );
              })}
              {/* User logged: other visits */}
            </div>
            <h2>OTHER VISITS</h2>
            <div>
              {data.otherVisits.map((visit, index) => {
                return (
                  <div key={index}>
                    <p>
                      {visit.title} - {visit._id}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // User logged out
          <div>
            <h2>VISITS</h2>
            <div>
              {data.data.map((visit, index) => {
                return (
                  <div key={index}>
                    <p>
                      {visit.title} - {visit._id}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Link to="/visit/form">
          <p>Create a new visit</p>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
