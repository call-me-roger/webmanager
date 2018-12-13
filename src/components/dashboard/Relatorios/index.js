import React, { Component } from "react";
// General Classes
import { generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// Material Components
// import Typography from "@material-ui/core/Typography";
// Includes
import PageHeader from "../@includes/templates/PageHeader";

class Relatorios extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader title="Relatórios" />
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(Relatorios);
