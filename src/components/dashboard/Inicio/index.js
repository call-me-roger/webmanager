import React, { Component } from "react";
// General Classes
import { generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// Material Components
import Typography from "@material-ui/core/Typography";
// Includes
import WeekSalesChart from "./WeekSalesChart";
import BestSellerProducts from "./BestSellerProducts";

class Inicio extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.appBarSpacer} />
        <Typography variant="h4" gutterBottom component="h2">
          Vendas da semana
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <WeekSalesChart />
        </Typography>
        <Typography variant="h4" gutterBottom component="h2">
          Produtos mais vendidos
        </Typography>
        <div className={classes.tableContainer}>
          <BestSellerProducts />
        </div>
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(Inicio);
