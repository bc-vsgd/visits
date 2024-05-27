import { TextField } from "@mui/material";

const SpotModalTextField = ({
  required,
  label,
  multiline,
  value,
  onChange,
}) => {
  return (
    <TextField
      className="mb-3 w-1/2"
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      multiline={multiline}
      label={label}
      value={value}
      onChange={onChange}
    />
  );
};

export default SpotModalTextField;
