import { Link } from "react-router-dom";

const VisitPageLink = ({ children, to, state }) => {
  return (
    <Link className=" text-lg no-underline " to={to} state={state}>
      {children}
    </Link>
  );
};

export default VisitPageLink;
