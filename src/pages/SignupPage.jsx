import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// MUI components
import { Box, Button, TextField } from "@mui/material";
// MUI Icons
// import WarningIcon from "@mui/icons-material/Warning";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// Components
import UserFormTextField from "../components/UserFormTextField";
import UserFormButton from "../components/UserFormButton";
import UserFormLink from "../components/UserFormLink";

const Signup = ({ url, setUserToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username && email && password && password2) {
        if (password === password2) {
          // Create author account
          try {
            const { data } = await axios.post(`${url}/visits/author/signup`, {
              username,
              email,
              password,
            });
            // console.log("sign up page, data: ", data.author);
            const userToken = data.author.token;
            Cookies.set("userToken", userToken);
            setUserToken(userToken);
            // Back to home page or to Visit title (creation) page
            if (location.state) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
          } catch (error) {
            console.log("Sign up page, error: ", error);
            setErrorMessage("This email already exists");
          }
        } else {
          setErrorMessage("Passwords must be identical");
        }
      } else {
        setErrorMessage("All fields must be filled");
      }
    } catch (error) {
      console.log("Sign up page, error: ", error);
    }
  };

  return (
    <Box component="main" className="font-roboto mx-auto w-[1000px]">
      <Box component="div">
        <Box component="form" className="flex flex-col ">
          <UserFormTextField
            required={true}
            label="Username"
            onChange={(event) => {
              setUsername(event.target.value);
              setErrorMessage("");
            }}
          />
          <UserFormTextField
            required={true}
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />
          <UserFormTextField
            required={true}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
          />
          <UserFormTextField
            required={true}
            label="Confirm password"
            onChange={(event) => {
              setPassword2(event.target.value);
              setErrorMessage("");
            }}
          />
          {errorMessage && (
            <Box component="div" className=" flex text-red-500 items-center">
              <WarningAmberIcon sx={{ fontSize: "24px" }} /> {errorMessage}
            </Box>
          )}
          <UserFormButton onClick={handleFormSubmit}>Sign up</UserFormButton>
        </Box>
        {/* Link to Log in page */}
        <Box className="mt-3">
          {location.state ? (
            <UserFormLink
              to="/author/login"
              state={{ from: location.state.from }}
            >
              Already have an account ?
            </UserFormLink>
          ) : (
            <UserFormLink to="/author/login">
              Already have an account ?
            </UserFormLink>
          )}
        </Box>
      </Box>
    </Box>
  );
};
{
  // <Link to="/author/login">Already have an account ?</Link>
  /* <Link to="/author/login" state={{ from: location.state.from }}>
            Already have an account ?
          </Link> */
}

export default Signup;
