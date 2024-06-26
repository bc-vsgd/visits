import { Link } from "react-router-dom";

const HomeVisitLink = ({ to, state, children }) => {
  //   console.log("to: ", to);
  //   console.log("state: ", state);
  return (
    <Link
      className="mx-auto flex w-[90%] justify-between border-x-0 border-b border-t-0 border-solid border-black px-2 py-1 no-underline sm:text-lg "
      to={to}
      state={state}
    >
      {children}
    </Link>
  );
};

export default HomeVisitLink;
