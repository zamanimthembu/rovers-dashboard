import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#c62828" },
    secondary: { main: "#163b7a" },
    info: { main: "#6aa4ff" },
    success: { main: "#2eaf4a" },
    warning: { main: "#f59e0b" },
    error: { main: "#d92d20" },
    background: {
      default: "#08162f",
      paper: "#101a33",
    },
    text: {
      primary: "#f7f9fc",
      secondary: "#a9b8d4",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: `"Segoe UI Variable", "Inter", "IBM Plex Sans", system-ui, sans-serif`,
    h4: { fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.05 },
    h6: { fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.15 },
    subtitle1: { fontWeight: 500, letterSpacing: -0.1 },
    body2: { lineHeight: 1.55 },
    overline: {
      fontWeight: 700,
      letterSpacing: 1.2,
      fontSize: "0.68rem",
      color: "#a9b8d4",
    },
  },
  shape: { borderRadius: 18 },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          colorScheme: "dark",
        },
        body: {
          backgroundImage:
            "radial-gradient(circle at top, rgba(22, 59, 122, 0.22), transparent 35%), linear-gradient(180deg, #0b1f4d 0%, #08162f 100%)",
        },
        "::selection": {
          backgroundColor: "rgba(198, 40, 40, 0.35)",
          color: "#f7f9fc",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%)",
          backgroundColor: "#101a33",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.28)",
          backdropFilter: "blur(14px)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 999,
          backgroundColor: alpha("#c62828", 0.14),
          border: "1px solid rgba(198, 40, 40, 0.24)",
        },
        deleteIcon: {
          color: "#f7f9fc",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          background: "rgba(8, 22, 47, 0.72)",
          borderRadius: 999,
          padding: 4,
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 0,
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 700,
          letterSpacing: 0.2,
          paddingLeft: 14,
          paddingRight: 14,
          color: "#d8e0ef",
          "&.Mui-selected": {
            backgroundColor: "#163b7a",
            color: "#f7f9fc",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#1c478f",
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.06)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#0d1730",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          color: "#f7f9fc",
          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.35)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textWrap: "balance",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
