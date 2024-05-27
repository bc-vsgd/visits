import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
// MUI components
import { Box, Typography } from "@mui/material";
// MUI icons
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Components
import VisitFormTextField from "../components/VisitFormTextField";
import VisitFormButton from "../components/VisitFormButton";

const VisitTitleFormPage = ({ url, userToken }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const visitFormSubmit = async (event) => {
    event.preventDefault();
    if (title) {
      try {
        const data = await axios.post(
          `${url}/visits/visit/create`,
          { title, city, city_details: details },
          { headers: { Authorization: `Bearer ${userToken}` } },
        );
        // console.log("visit form page, data: ", data);
        const id = data.data.visit._id;
        navigate(`/visit/form/${id}/spots`, {
          state: { title, city, details, userToken },
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
    <Box component="main" className="mx-auto w-[1000px] font-roboto">
      <Box component="div">
        <Typography variant="h4">New visit</Typography>
        <Box component="div">
          <Box component="form" className="flex flex-col">
            <VisitFormTextField
              required={true}
              label="Visit title"
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorMessage("");
              }}
            />
            <VisitFormTextField
              label="City"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <VisitFormTextField
              label="City details ..."
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            />
            {errorMessage && (
              <Box component="div" className=" flex items-center text-red-500">
                <WarningAmberIcon sx={{ fontSize: "24px" }} /> {errorMessage}
              </Box>
            )}
          </Box>
          <Box>
            <VisitFormButton
              onClick={visitFormSubmit}
              startIcon={<AddCircleIcon />}
            >
              Add a spot
            </VisitFormButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitTitleFormPage;
