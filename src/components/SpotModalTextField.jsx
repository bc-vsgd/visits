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
      className="mb-0 w-4/5 sm:mb-2  sm:w-3/4 md:mb-3 "
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
