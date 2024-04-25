import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../../components/Loader/Loader";

const HomePage = ({ url, userToken, userId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserData, setIsUserData] = useState(false);
  const [token, setToken] = useState(userToken);
  const [id, setId] = useState(userId);
  console.log("home page, user token: ", userToken);
  console.log("home page, user id: ", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetch data");
        if (id || token) {
          if (id) {
            const { data } = await axios.get(`${url}/visits/${id}`);
            console.log("Home page: data: ", data);
            console.log("Home page: data - author visits: ", data.authorVisits);
            //
            setData(data);

            setIsUserData(true);
          }
        } else {
          const { data } = await axios.get(`${url}/visits`);
          console.log("Home page: data: ", data);
          setData(data);
        }
      } catch (error) {
        console.log("Home page, error: ", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id, token]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Home Page</h1>

      <div>
        <h2>Visits</h2>
        {id && (
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
