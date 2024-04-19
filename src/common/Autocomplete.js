"use client";
import React from "react";
import Autocomp from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Autocomplete = ({
  options = [],
  id,
  label,
  error,
  helperText,
  ...rest
}) => {
  return (
    <Autocomp
      disablePortal
      id={id}
      options={options}
      freeSolo={true}
      onInputChange={(event, value, reason) => {
        if (reason === "clear") {
          if (rest?.onClearHandler) rest?.onClearHandler();
        }
      }}
      {...rest}
      renderInput={(params) => (
        <TextField
          onChange={(e) => rest?.onChangeHandler(e.target.value)}
          label={label}
          error={error}
          helperText={helperText}
          {...params}
        />
      )}
    />
  );
};

export default Autocomplete;
