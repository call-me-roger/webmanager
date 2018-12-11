import React, { Component } from "react";
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

export default Inicio;
