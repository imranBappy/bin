"use client";
import { createTheme as createMuiTheme } from "@mui/material";
import createTypography from "./create-typography";
import createFontFamily from "./create-fontFamily.js";
import getDesingTokens from "./getDesignTokens.js";

function createTheme(mode) {
  const palette = getDesingTokens(mode);
  const typography = createTypography();
  const fontFamily = createFontFamily();

  return createMuiTheme({
    palette,
    typography: {
      fontFamily,
      ...typography,
    },

    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: palette.primary.main,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.primary.main,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });
}
const theme = createTheme;
export default theme;
