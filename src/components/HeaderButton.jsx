import { Button } from "@mui/material";

const HeaderButton = ({ children, startIcon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      startIcon={startIcon}
      size="large"
      className="text-md px-1 py-1 sm:text-lg md:px-3 md:py-2 "
    >
      {children}
    </Button>
  );
};

export default HeaderButton;
