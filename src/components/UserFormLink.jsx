import { Link } from "react-router-dom";

const UserFormLink = ({ children, to, state }) => {
  return (
    <Link className="no-underline text-lg py-2 " to={to} state={state}>
      {children}
    </Link>
  );
};

export default UserFormLink;
