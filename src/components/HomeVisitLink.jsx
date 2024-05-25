import { Link } from "react-router-dom";

const HomeVisitLink = ({ to, state, children }) => {
  //   console.log("to: ", to);
  //   console.log("state: ", state);
  return (
    <Link
      className="no-underline flex justify-between text-lg py-1 px-2 border-b border-x-0 border-t-0 border-solid border-black "
      to={to}
      state={state}
    >
      {children}
    </Link>
  );
};

export default HomeVisitLink;
