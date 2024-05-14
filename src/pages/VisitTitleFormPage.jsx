import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
// MUI components
import { Box, Typography } from "@mui/material";

const VisitTitleFormPage = ({ url, userToken }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const visitSubmit = async (event) => {
    event.preventDefault();
    if (title) {
      try {
        const data = await axios.post(
          `${url}/visits/visit/create`,
          { title, city, city_details: details },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        // console.log("visit form page, data: ", data);
        const id = data.data.visit._id;
        navigate(`/visit/form/${id}/spots`, {
          state: { title, city, details },
        });
      } catch (error) {
        console.log("Visit form page, error: ", error);
      }
    } else {
      setErrorMessage("Title required");
    }
  };

  return !userToken ? (
    <Navigate to="/author/login" state={{ from: "/visit/form" }} />
  ) : (
    <Box component="main" className="font-roboto">
      <Box component="div">
        <Typography variant="h4">New visit</Typography>
        {/* Title form component ? */}
        <Box component="div">
          <form onSubmit={visitSubmit}>
            <input
              type="text"
              placeholder="Visit title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorMessage("");
              }}
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="City details ..."
              value={details}
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            />
            <button>Add a spot</button>
            <div>{errorMessage}</div>
          </form>
        </Box>
        {/* Title form component ? */}
      </Box>
    </Box>
  );
};

export default VisitTitleFormPage;
