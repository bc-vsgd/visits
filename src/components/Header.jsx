import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button } from "@mui/material";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  return (
    <Box component="header" className="flex font-roboto">
      <Box
        component="div"
        className="flex justify-between border-2 border-solid border-blue-500"
      >
        <Box
          component="div"
          className="border-2 border-solid border-black w-28 h-10"
        >
          <Link className="header-link" to="/">
            Home
          </Link>
        </Box>
        {!userToken ? (
          <Box
            component="div"
            className="flex justify-between border-2 border-solid border-black w-36 h-10"
          >
            <Box component="div">
              <Link className="header-link" to="/author/signup">
                Sign up
              </Link>
            </Box>
            <Box component="div">
              <Link className="header-link" to="/author/login">
                Log in
              </Link>
            </Box>
          </Box>
        ) : (
          <Box
            component="div"
            className="border-2 border-solid border-black w-28 h-10"
          >
            <Button
              onClick={() => {
                Cookies.remove("userToken");
                setUserToken("");
                navigate("/");
              }}
            >
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
