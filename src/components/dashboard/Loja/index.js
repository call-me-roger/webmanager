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

class Loja extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader title="Loja" />
        <Grid container spacing={16}>
          <Grow in={true}>
            <Grid item sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Cadastrar Produto
                  </Typography>
                  <Typography component="p">
                    Adicione um novo produto à loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="loja/produtos/cadastrar">
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
                    Listar Produtos
                  </Typography>
                  <Typography component="p">
                    Listar todos os produtos da loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="loja/produtos/listar">
                    <Button size="medium" color="secondary" variant="contained">
                      Listar produtos
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
                    Gerenciar Departamentos
                  </Typography>
                  <Typography component="p">
                    Cadastre e edite os departamentos da loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="loja/departamentos/listar">
                    <Button size="medium" color="secondary" variant="contained">
                      Departamentos
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
                    Gerenciar Marcas
                  </Typography>
                  <Typography component="p">
                    Cadastre e edite as marcas da loja
                  </Typography>
                </CardContent>
                <CardActions style={{ paddingBottom: "15px" }}>
                  <Link to="loja/marcas/listar">
                    <Button size="medium" color="secondary" variant="contained">
                      Marcas
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

export default withMultipleStyles(generalStyles)(Loja);
