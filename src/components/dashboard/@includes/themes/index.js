import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[800],
      contrastText: "#fff"
    }
  }
});
