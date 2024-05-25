import { Button } from "@mui/material";

const HeaderButton = ({ children, startIcon }) => {
  return (
    <Button
      variant="outlined"
      startIcon={startIcon}
      size="large"
      className="text-lg"
    >
      {children}
    </Button>
  );
};

export default HeaderButton;
