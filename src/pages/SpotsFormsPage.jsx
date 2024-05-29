import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
// MUI components
import { Box, Typography, Card, CardMedia } from "@mui/material";
// Components
import Loader from "../components/Loader";
import OneSpotForm from "../components/OneSpotForm";

const SpotsFormsPage = ({ url }) => {
  // id: visit id
  const { id } = useParams();
  const location = useLocation();
  const { title, city, details, description, userToken } = location.state;
  const [data, setData] = useState([]);
  // Spots number
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // data: existing spots of this visit
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        // console.log("Spots forms page, data: ", data.data);
        setData(data.data);
      } catch (error) {
        // No spot yet
        console.log("Spots forms page, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dataLength]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box component="div" className="mx-auto w-[1000px] font-roboto">
      {/* Display visit title */}
      <Box component="div">
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{city}</Typography>
        <Typography>{details}</Typography>
        <Typography>{description}</Typography>
      </Box>
      {/* Display existing spots */}
      {data && (
        <Box component="div">
          {data.map((spot, index) => {
            return (
              <Card key={index} className="w-80" component="div">
                <CardMedia
                  component="img"
                  image={spot.spot_image.secure_url}
                  alt={spot.title}
                />
                <Box component="div">{spot.title}</Box>
              </Card>
            );
          })}
        </Box>
      )}

      {/* New spot form */}
      <Box component="div">
        <OneSpotForm
          url={url}
          id={id}
          setIsLoading={setIsLoading}
          dataLength={dataLength}
          setDataLength={setDataLength}
          userToken={userToken}
        />
      </Box>
    </Box>
  );
};

export default SpotsFormsPage;
