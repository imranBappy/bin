import createDarkPalette from "./create-dark-palette";
import createLightPalette from "./create-Light-palette";
const getDesingTokens = (mode = "light") => ({
  mode,
  ...(mode === "light" ? createLightPalette() : createDarkPalette()),
});
export default getDesingTokens;
