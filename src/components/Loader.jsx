import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box className="flex items-center justify-center">
      <Box component="div" className="h-[500px] w-[500px]">
        Loading ...
      </Box>
    </Box>
  );
};

export default Loader;
