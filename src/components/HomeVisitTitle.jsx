import { Typography } from "@mui/material";

const HomeVisitTitle = ({ children }) => {
  return (
    <Typography
      variant="h3"
      className="border-2 border-solid w-[500px] text-center mx-auto py-2.5 my-6"
    >
      {children}
    </Typography>
  );
};

export default HomeVisitTitle;
