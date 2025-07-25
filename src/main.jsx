// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
