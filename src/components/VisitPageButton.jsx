import { Button } from "@mui/material";

const VisitPageButton = ({ children, startIcon, onClick }) => {
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

export default VisitPageButton;
