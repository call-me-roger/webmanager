import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
// Includes

class Relatorios extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom component="h2">
          Relatórios
        </Typography>
      </React.Fragment>
    );
  }
}

export default Relatorios;
