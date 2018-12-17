import React from "react";
import withMultipleStyles from "../themes/withMultipleStyles";
import { generalStyles } from "../themes";
import { Link } from "react-router-dom";
import { Slide, Grid, Typography, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const PageHeader = ({ title, description, backRoute, classes }) => {
  return (
    <React.Fragment>
      <div className={classes.appBarSpacer} />
      <Slide in={true} direction="down">
        <React.Fragment>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                variant="h4"
                gutterBottom
                component="h2"
                color="secondary"
              >
                {title}
              </Typography>
              {description && (
                <Typography
                  variant="h6"
                  component="h3"
                  style={{ paddingBottom: "20px" }}
                >
                  {description}
                </Typography>
              )}
            </Grid>
            {backRoute && (
              <Grid item>
                <Link to={backRoute}>
                  <Button variant="text" color="primary">
                    <ArrowBackIosIcon /> Voltar
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </React.Fragment>
      </Slide>
    </React.Fragment>
  );
};

export default withMultipleStyles(generalStyles)(PageHeader);
