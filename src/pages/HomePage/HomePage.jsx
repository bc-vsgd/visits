import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// Components
import Loader from "../../components/Loader/Loader";

const HomePage = ({ url }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visits`);
        // console.log("Home page: data: ", data);
        setData(data.data);
      } catch (error) {
        console.log("Home page, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <h1>Home Page</h1>
      <div>
        <h2>Visits</h2>
        <div>
          {data.map((visit, index) => {
            return (
              <div key={index}>
                <p>
                  {visit.title} - {visit._id}
                </p>
              </div>
            );
          })}
          <Link to="/visit/form">
            <p>Create a new visit</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
