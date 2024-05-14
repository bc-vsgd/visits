import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// MUI components
import { Box, TextField, Button } from "@mui/material";

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
    <Box component="main" className="font-roboto">
      <Box component="div">
        <Box component="form">
          <TextField
            required
            variant="standard"
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            required
            variant="standard"
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button onClick={handleFormSubmit}>Log in</Button>
          <Box component="div">{errorMessage}</Box>
        </Box>
        {/* Link to Sign up page */}
        {location.state ? (
          <Link to="/author/signup" state={{ from: location.state.from }}>
            Create an account
          </Link>
        ) : (
          <Link to="/author/signup">Create an account</Link>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
