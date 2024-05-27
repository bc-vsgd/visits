import { TextField } from "@mui/material";

const VisitFormTextField = ({ required, label, value, onChange }) => {
  return (
    <TextField
      className="mb-3 w-1/2"
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      label={label}
      value={value}
      onChange={onChange}
    />
  );
};

export default VisitFormTextField;
