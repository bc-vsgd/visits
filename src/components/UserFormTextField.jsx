import { TextField } from "@mui/material";

const UserFormTextField = ({ required, label, onChange }) => {
  return (
    <TextField
      className="mb-0 w-3/4  sm:mb-2 sm:w-3/5 md:mb-3 md:w-1/2"
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      label={label}
      onChange={onChange}
    />
  );
};

export default UserFormTextField;
