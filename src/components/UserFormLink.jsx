import { Link } from "react-router-dom";

const UserFormLink = ({ children, to, state }) => {
  return (
    <Link className="py-2  no-underline md:text-lg" to={to} state={state}>
      {children}
    </Link>
  );
};

export default UserFormLink;
