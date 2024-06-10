import { Box } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Loader = () => {
  return (
    <Box className=" mx-auto flex h-[600px] w-11/12 items-center justify-center">
      <Box
        component="div"
        className="flex h-[200px] w-[200px] items-center justify-center"
      >
        <AutorenewIcon className="text-9xl text-blue-500" />
      </Box>
    </Box>
  );
};

export default Loader;
