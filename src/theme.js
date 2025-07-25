// src/theme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000", // pure black
      paper: "#121212", // slightly lighter for Card background
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#f48fb1", // pink accent
    },
  },
  typography: {
    fontFamily: "Avenir, system-ui, sans-serif",
  },
});

export default darkTheme;
