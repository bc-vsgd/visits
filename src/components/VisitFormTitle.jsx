import { Typography } from "@mui/material";

const VisitFormTitle = ({ children }) => {
  return (
    <Typography className="mx-auto my-6 w-[400px] border-x-0 border-b border-t-0 border-solid border-black py-2.5 text-center text-3xl sm:w-[500px] sm:text-4xl md:text-5xl">
      {children}
    </Typography>
  );
};

export default VisitFormTitle;
