import { TextField } from "@mui/material";

const UserFormTextField = ({ required, label, onChange }) => {
  return (
    <TextField
      className="w-1/2 mb-3"
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      label={label}
      onChange={onChange}
    />
  );
};

export default UserFormTextField;
