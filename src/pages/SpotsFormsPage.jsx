import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../components/Loader";
import OneSpotForm from "../components/OneSpotForm";
// MUI components
import { Box, Typography } from "@mui/material";

const SpotsFormsPage = ({ url }) => {
  // id: visit id
  const { id } = useParams();
  const location = useLocation();
  // const navigate = useNavigate();
  const { title, city, details } = location.state;
  const [data, setData] = useState([]);
  // Spots number
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
    <Box component="div" className="font-roboto">
      {/* Display visit title */}
      <Box component="div">
        <Typography>{title}</Typography>
        <Typography>{city}</Typography>
        <Typography>{details}</Typography>
      </Box>
      {/* Display existing spots */}
      <Box component="div">
        {data.map((spot, index) => {
          return (
            <Box component="div" key={index}>
              {spot.title}
            </Box>
          );
        })}
      </Box>
      {/* New spot form */}
      <Box component="div">
        <OneSpotForm
          url={url}
          id={id}
          setIsLoading={setIsLoading}
          dataLength={dataLength}
          setDataLength={setDataLength}
        />
      </Box>
    </Box>
  );
};

export default SpotsFormsPage;
