import React, { Component } from "react";
// General Classes
import { generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// Material Components
import Typography from "@material-ui/core/Typography";
// Includes

class Integrações extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom component="h2">
          Integrações
        </Typography>
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(Integrações);
