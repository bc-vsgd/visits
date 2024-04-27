import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../../components/Loader/Loader";
import OneSpotForm from "../../components/OneSpotForm/OneSpotForm";

const SpotsFormsPage = ({ url }) => {
  // id: visit id
  const { id } = useParams();
  const location = useLocation();
  const { title, city, details } = location.state;
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        // console.log("Spots forms page, data: ", data.data);
        setData(data.data);
      } catch (error) {
        console.log("Spots forms page, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dataLength]);
  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div>
        <p>{title}</p>
        <p>{city}</p>
        <p>{details}</p>
      </div>
      <div>
        {data.map((spot, index) => {
          return <div key={index}>{spot.title}</div>;
        })}
      </div>
      <div>
        <OneSpotForm
          url={url}
          id={id}
          setIsLoading={setIsLoading}
          setDataLength={setDataLength}
        />
      </div>
    </div>
  );
};

export default SpotsFormsPage;
