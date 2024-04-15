import { alpha } from "@mui/material/styles";

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

export default function createDarkPalette() {
  return {
    primary: {
      main: violetBase,
    },
    secondary: {
      main: violetMain,
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    bg: {
      default: "#F9FBFE",
      transparent: "rgba(0, 0, 0, 0.55)",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#7C8493",
      darkBlue: "#25324B",
      lightBlue: "#1C3E5EBF",
      grey: "#515B6F",
      blue: "#26A4FF",
    },
    border: {
      primary: "#39465E",
    },
    common: {
      grey: "#F9FAFB",
      red: "#FC4A4A",
      blue: "#0079D1",
    },
    background: {
      default: "#111418",
      secondary: "#25292e", ///#030405
    },
    
  };
}
