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
      sx={{
        textTransform: "capitalize",
      }}
      {...rest}
      renderInput={(params) => (
        <TextField
          onChange={(e) =>
            rest?.onChangeHandler ? rest?.onChangeHandler(e.target.value) : null
          }
          label={label}
          error={error}
          helperText={helperText}
          style={{
            textTransform: "capitalize",
          }}
          {...params}
        />
      )}
    />
  );
};

export default Autocomplete;
