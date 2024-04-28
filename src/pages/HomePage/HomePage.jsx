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
          try {
            // console.log("fetch 2: try: user token: ", userToken);
            if (userToken) {
              if (userId) {
                const { data } = await axios.get(`${url}/visits/${userId}`);
                console.log("home page, fetch 2, data: ", data);
                setData(data);
              }
            } else {
              const { data } = await axios.get(`${url}/visits`);
              console.log("home page, fetch 2, data: ", data);
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
        {/* No visit */}
        {data.foundVisits.length === 0 ? (
          <div>NO VISIT YET</div>
        ) : // Visits & user logged
        userId ? (
          <div>
            {/* User's visits */}
            {data.authorVisits.length > 0 && (
              <div>
                <h2>MY VISITS</h2>
                <div>
                  {data.authorVisits.map((visit, index) => {
                    return (
                      <div key={index}>
                        <Link
                          to={`/visit/${visit._id}`}
                          //
                          state={{ userToken: userToken }}
                          //
                        >
                          {visit.title} - {visit.author.username}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* User logged: other visits */}
            <h2>VISITS</h2>
            <div>
              {data.otherVisits.map((visit, index) => {
                return (
                  <div key={index}>
                    <Link to={`/visit/${visit._id}`}>
                      {visit.title} - {visit.author.username}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          //
          // User logged out: all visits
          <div>
            <h2>VISITS</h2>
            <div>
              {data.foundVisits.map((visit, index) => {
                return (
                  <div key={index}>
                    <Link to={`/visit/${visit._id}`}>
                      {visit.title} - {visit.author.username}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Link to create a visit page */}
        <Link to="/visit/form">
          <p>Create a new visit</p>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
