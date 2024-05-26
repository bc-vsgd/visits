import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// MUI components
import { Box, TextField, Button } from "@mui/material";
// Icons
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// Components
import UserFormButton from "../components/UserFormButton";
import UserFormLink from "../components/UserFormLink";
import UserFormTextField from "../components/UserFormTextField";

const LoginPage = ({ url, setUserToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const { data } = await axios.post(`${url}/visits/author/login`, {
          email,
          password,
        });
        // console.log("log in, data", data);
        const userToken = data.author.token;
        Cookies.set("userToken", userToken);
        setUserToken(userToken);
        // Back to home page or to visit title creation page
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage("All fields must be filled");
      }
    } catch (error) {
      console.log("Log in page, error: ", error);
      setErrorMessage("This account does not exist");
    }
  };
  return (
    <Box component="main" className="mx-auto w-[1000px] font-roboto">
      <Box component="div">
        <Box component="form" className="flex flex-col">
          <UserFormTextField
            required={true}
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <UserFormTextField
            required={true}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {errorMessage && (
            <Box component="div" className=" flex items-center text-red-500">
              <WarningAmberIcon sx={{ fontSize: "24px" }} /> {errorMessage}
            </Box>
          )}
          <Box className="mx-auto">
            <UserFormButton onClick={handleFormSubmit}>Log in</UserFormButton>
          </Box>
        </Box>
        {/* Link to Sign up page */}
        <Box className="mt-3">
          {location.state ? (
            <UserFormLink
              to="/author/signup"
              state={{ from: location.state.from }}
            >
              Create an account
            </UserFormLink>
          ) : (
            <UserFormLink to="/author/signup">Create an account</UserFormLink>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
