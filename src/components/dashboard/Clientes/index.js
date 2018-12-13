import React, { Component } from "react";
// General Classes
import { generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// Material Components
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Grow
} from "@material-ui/core";
import { Link } from "react-router-dom";
// Includes
import PageHeader from "../@includes/templates/PageHeader";

class Clientes extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader title="Clientes" />
        <Grid container spacing={16}>
          <Grow in={true}>
            <Grid item sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Cadastrar Cliente
                  </Typography>
                  <Typography component="p">
                    Adicione um novo cliente à loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="/clientes/cadastrar">
                    <Button size="medium" color="secondary" variant="contained">
                      Cadastrar
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
          <Grow in={true}>
            <Grid item sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Listar Clientes
                  </Typography>
                  <Typography component="p">
                    Listar todos os Clientes da loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="/clientes/listar">
                    <Button size="medium" color="secondary" variant="contained">
                      Listar clientes
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(Clientes);
