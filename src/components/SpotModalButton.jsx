import { Button } from "@mui/material";

const SpotModalButton = ({ children, startIcon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      startIcon={startIcon}
      size="large"
      className="text-lg"
    >
      {children}
    </Button>
  );
};

export default SpotModalButton;
