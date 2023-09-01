// import { createTheme } from "@mui/material/styles";

// export const theme = createTheme({
//   shadows: ["none"],
//   palette: {
//     primary: {
//       main: "#4361ee",
//     },
//   },
//   typography: {
//     button: {
//       textTransform: "none",
//       fontWeight: 400,
//     },
//   },
// });

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: [
    "none",   // Elevation 0
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)", // Elevation 1
    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)", // Elevation 2
    // ... add more shadows for higher elevations
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
