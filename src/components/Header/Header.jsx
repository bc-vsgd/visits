import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  return (
    <header className="flex-row">
      <div className="flex-row ">
        <div>
          <Link className="header-link" to="/">
            Home
          </Link>
        </div>
        <div>
          <Link className="header-link" to="/author/signup">
            Sign up
          </Link>
        </div>
        <div>
          <Link className="header-link" to="/author/login">
            Log in
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              Cookies.remove("userToken");
              setUserToken("");
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
