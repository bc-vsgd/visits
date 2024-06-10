import { TextField } from "@mui/material";

const VisitFormTextField = ({
  required,
  label,
  value,
  onChange,
  multiline,
}) => {
  return (
    <TextField
      className="mb-0 w-4/5 sm:mb-2  sm:w-3/4 md:mb-3 "
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      label={label}
      value={value}
      onChange={onChange}
      multiline={multiline}
    />
  );
};

export default VisitFormTextField;
