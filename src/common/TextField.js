import MuiTextFiled from "@mui/material/TextField";

const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  fullWidth = true,
  style = {},
  ...props
}) => {
  return (
    <MuiTextFiled
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      fullWidth
      sx={{
      
        ...style,
      }}
      {...props}
    />
  );
};

export default TextField;
