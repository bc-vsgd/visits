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
// MUI components
import { Box, Typography } from "@mui/material";
// MUI icons
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// Components
import Loader from "../components/Loader";
import VisitFormTitle from "../components/VisitFormTitle";
import VisitFormTextField from "../components/VisitFormTextField";
import VisitFormButton from "../components/VisitFormButton";

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
  const [description, setDescription] = useState("Description");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visits/visit/${id}`);
        //   console.log("update, data: ", data.data[0]);
        setVisitData(data.data[0]);
        const { title, city, city_details, description } = data.data[0];
        setTitle(title);
        if (city) {
          setCity(city);
        }
        if (city_details) setDetails(city_details);
        if (description) setDescription(description);
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
          {
            title: title,
            city: city,
            details: details,
            description: description,
          },
          { headers: { Authorization: `Bearer ${userToken}` } },
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
    <Box component="main" className="mx-auto w-[90%] font-roboto">
      <Box component="div">
        <VisitFormTitle>Update visit</VisitFormTitle>
        <Box component="div">
          <Box component="form" className="flex flex-col">
            <VisitFormTextField
              required={true}
              label="Visit title"
              value={title && title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorMessage("");
              }}
            />
            <VisitFormTextField
              label="City"
              value={city && city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <VisitFormTextField
              label="City details ..."
              value={details && details}
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            />
            <VisitFormTextField
              label="Description"
              value={description && description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              multiline={true}
            />
            {errorMessage && (
              <Box component="div" className=" flex items-center text-red-500">
                <WarningAmberIcon sx={{ fontSize: "24px" }} /> {errorMessage}
              </Box>
            )}
            <Box className="pt-2 sm:pt-3 md:pt-4">
              <VisitFormButton
                startIcon={<RefreshIcon />}
                onClick={visitFormSubmit}
              >
                Update visit title
              </VisitFormButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitTitleUpdatePage;
