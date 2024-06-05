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
    <Box
      component="div"
      className="mx-auto w-[95%] font-roboto sm:w-[90%] md:w-4/5"
    >
      <Box className="mx-auto w-[90%]">
        {/* Display visit title */}
        <Box
          component="div"
          className="mb-3 border-x-0 border-b border-t-0 border-solid border-black sm:mb-5"
        >
          <Typography className="pb-1 text-2xl sm:pb-2 sm:text-3xl md:pb-3">
            {title}
          </Typography>
          <Typography className="pb-1 text-xl sm:pb-2 sm:text-2xl md:pb-3">
            {city}
          </Typography>
          <Typography className="pb-1 text-sm sm:pb-2 sm:text-base md:pb-3">
            {details}
          </Typography>
          <Typography className=" pb-2 text-sm  sm:text-base md:pb-3">
            {description}
          </Typography>
        </Box>
        {/* Display existing spots */}
        {data && (
          <Box
            component="div"
            className="mx-auto flex w-[100%] flex-wrap gap-1"
          >
            {data.map((spot, index) => {
              return (
                <Card
                  key={index}
                  className="mx-auto w-[80%] sm:w-[48%] xl:w-[32%]"
                  component="div"
                >
                  <CardMedia
                    component="img"
                    image={spot.spot_image.secure_url}
                    alt={spot.title}
                  />
                  <Box component="div" className="p-2">
                    {spot.title}
                  </Box>
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
    </Box>
  );
};

export default SpotsFormsPage;
