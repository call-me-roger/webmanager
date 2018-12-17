import React, { Component } from "react";
// General Classes
import { generalStyles } from "../../@includes/themes";
import withMultipleStyles from "../../@includes/themes/withMultipleStyles";
// Material Components
import { Grid } from "@material-ui/core";
// Includes
import PageHeader from "../../@includes/templates/PageHeader";

class ListarMarcas extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader title="Gerenciar marcas" backRoute="/loja" />
        <Grid container spacing={16} />
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(ListarMarcas);
