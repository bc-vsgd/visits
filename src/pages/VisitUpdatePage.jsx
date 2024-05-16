// UNUSED: replaced by VisitTitleUpdatePage

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Components
import OneSpotForm from "../components/OneSpotForm";
// MUI components
import { Box, Typography, TextField } from "@mui/material";

const VisitUpdatePage = ({ url }) => {
  const location = useLocation();
  const { id } = useParams();

  // States
  const [visitData, setVisitData] = useState(location.state.visitData);
  const [spotsData, setSpotsData] = useState(location.state.spotsData);
  //
  const [title, setTitle] = useState(visitData.title);
  const [city, setCity] = useState(visitData.city);
  const [details, setDetails] = useState(visitData.city_details);
  const [errorMessage, setErrorMessage] = useState("");

  const visitSubmit = (event) => {
    event.preventDefault();
    console.log("visit submit");
  };

  return (
    <Box component="main" className="font-roboto">
      <Box component="div">
        <Typography variant="h4">Update visit</Typography>
        {/* Title form component ? */}
        <Box component="div">
          <Box component="form" onSubmit={visitSubmit}>
            {/* <TextField variant="standard" /> */}
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
            <div>{errorMessage}</div>
          </Box>
        </Box>
        {/* Spots */}
        {spotsData &&
          spotsData.map((spot, index) => {
            return <OneSpotForm key={index} spot={spot} />;
          })}
      </Box>
    </Box>
  );
};

export default VisitUpdatePage;
