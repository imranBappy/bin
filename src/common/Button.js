"use client";

import React from "react";
import MuiButton from "@mui/material/Button";

const Button = ({
  variant = "contained",
  color = "primary",
  children,
  title = children,
  onClick,
  size = "large",
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
      disabled={disabled}
      {...props}
    >
      {title}
    </MuiButton>
  );
};

export default Button;
