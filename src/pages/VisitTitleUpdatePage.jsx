// Update visit title

// React
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
// Packages
import axios from "axios";
// Components
import Loader from "../components/Loader";
// MUI components
import { Box, Typography, TextField, Button } from "@mui/material";

const VisitTitleUpdatePage = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = location.state.userToken;
  //   States
  const [visitData, setVisitData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("City");
  const [details, setDetails] = useState("City details ...");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visits/visit/${id}`);
        //   console.log("update, data: ", data.data[0]);
        setVisitData(data.data[0]);
        const { title, city, city_details } = data.data[0];
        setTitle(title);
        if (city) {
          setCity(city);
        }
        if (city_details) setDetails(city_details);
      } catch (error) {
        console.log("Update visit title, error: ", error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const visitFormSubmit = async (event) => {
    event.preventDefault();
    if (title) {
      try {
        const { data } = await axios.put(
          `${url}/visits/visit/${id}/update`,
          { title: title, city: city, details: details },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        navigate(`/visit/${id}`, { state: { userToken: userToken } });
      } catch (error) {
        console.log("Visit form page, error: ", error);
      }
    } else {
      setErrorMessage("Title required");
    }
  };

  if (isLoading) return <Loader />;

  return !userToken ? (
    <Navigate to="/author/login" state={{ from: "/visit/form" }} />
  ) : (
    <Box component="main" className="font-roboto">
      <Box component="div">
        <Typography variant="h4">Update visit</Typography>
        <Box component="div">
          <Box component="form">
            <TextField
              required
              variant="standard"
              label="Visit title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorMessage("");
              }}
            />
            <TextField
              variant="standard"
              label="City"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              label="City details ..."
              value={details}
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            />
            <Button onClick={visitFormSubmit}>Update visit title</Button>
            <Box component="div">{errorMessage}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitTitleUpdatePage;
