import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// MUI components
import { Box, Button } from "@mui/material";
// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
// Components
import HeaderButton from "./HeaderButton";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  return (
    <Box component="header" className="flex font-roboto mb-4">
      <Box
        component="div"
        className="flex justify-between w-3/4 my-0 mx-auto border-2 border-solid border-blue-500"
      >
        <Box component="div">
          <Link className="header-link" to="/">
            <HeaderButton startIcon={<HomeIcon />}>Home</HeaderButton>
          </Link>
        </Box>
        {!userToken ? (
          <Box component="div" className="flex justify-between ">
            <Box component="div">
              <Link className="header-link" to="/author/signup">
                <HeaderButton>Sign up</HeaderButton>
              </Link>
            </Box>
            <Box component="div">
              <Link className="header-link" to="/author/login">
                <HeaderButton>Log in</HeaderButton>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box component="div">
            <HeaderButton
              onClick={() => {
                Cookies.remove("userToken");
                setUserToken("");
                navigate("/");
              }}
            >
              Log out
            </HeaderButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
