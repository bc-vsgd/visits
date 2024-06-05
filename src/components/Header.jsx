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
    <Box
      component="header"
      className="mb-4 flex border-x-0 border-b border-t-0 border-solid pb-2 font-roboto sm:pb-3  md:pb-4"
    >
      <Box
        component="div"
        className="mx-auto mb-0 mt-2 flex w-3/4 justify-between "
      >
        <Box component="div">
          <Link to="/">
            <HeaderButton startIcon={<HomeIcon />}>Home</HeaderButton>
          </Link>
        </Box>
        {!userToken ? (
          <Box component="div" className="flex justify-between ">
            <Box component="div">
              <Link to="/author/signup">
                <HeaderButton>Sign up</HeaderButton>
              </Link>
            </Box>
            <Box component="div">
              <Link to="/author/login">
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
