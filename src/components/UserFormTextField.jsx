import { TextField } from "@mui/material";

const UserFormTextField = ({ required, label, onChange }) => {
  return (
    <TextField
      className="mb-3 w-1/2"
      InputProps={{ style: { fontSize: "16px" } }}
      variant="standard"
      required={required}
      label={label}
      onChange={onChange}
    />
  );
};

export default UserFormTextField;
