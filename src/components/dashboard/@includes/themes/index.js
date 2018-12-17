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
      dark: green[700],
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5252",
      main: "#f77575",
      dark: "#ec4141",
      contrastText: "#fff"
    }
  }
});

export const generalStyles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  fwFormControl: {
    width: "calc(100% - 32px)",
    margin: "16px",
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "0",
    marginBottom: "0"
  },
  fwTextArea: {
    width: "calc(100% - 32px)",
    margin: "16px",
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "-16px",
    marginBottom: "0"
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  ctrlButtonMR: {
    marginLeft: "15px"
  },
  ctrlButtonML: {
    marginRight: "15px"
  }
});
