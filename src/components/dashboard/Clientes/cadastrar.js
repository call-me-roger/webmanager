import React, { Component } from "react";
import {
  Typography,
  Grid,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Paper,
  Slide,
  Zoom
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
// Includes
import isEmail from "../@functions/validator";

function TabContainer(props) {
  return (
    <Paper elevation={3} square>
      <Grid container spacing={32} style={{ marginTop: 0 }}>
        {props.children}
      </Grid>
    </Paper>
  );
}

class CadastrarCliente extends Component {
  state = {
    nome: "",
    email: "",
    celular: "",
    value: 0
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  errName = () => {
    const { nome } = this.state;
    return nome && nome.length < 3;
  };

  errEmail = () => {
    const { email } = this.state;
    return email && !isEmail(email);
  };

  errCelular = () => {
    const { celular } = this.state;
    return celular && celular.length < 14;
  };

  handleTabs = (event, value) => {
    this.setState({ value });
  };

  getMainForm = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <FormControl
            className={classes.fwFormControl}
            error={this.errName() || false}
            aria-describedby="nome-error-text"
            fullWidth
          >
            <InputLabel htmlFor="nome-error-text">Nome Completo</InputLabel>
            <Input
              id="nome"
              value={this.state.nome}
              onChange={this.handleChange}
            />
            <FormHelperText id="nome-error-text">
              {this.errName()
                ? "O nome precisa ter no mínimo 3 caracteres"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl
            className={classes.fwFormControl}
            error={this.errEmail() || false}
            aria-describedby="email-error-text"
            fullWidth
          >
            <InputLabel htmlFor="email-error-text">Email</InputLabel>
            <Input
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
            />
            <FormHelperText id="email-error-text">
              {this.errEmail()
                ? "O email precisa ser preenchido corretamente"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl
            className={classes.fwFormControl}
            error={this.errCelular() || false}
            aria-describedby="celular-error-text"
            fullWidth
          >
            <InputLabel htmlFor="celular-error-text">Celular</InputLabel>
            <Input
              id="celular"
              value={this.state.celular}
              onChange={this.handleChange}
              type="tel"
            />
            <FormHelperText id="celular-error-text">
              {this.errCelular()
                ? "O Celular precisa ser preenchido corretamente"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <div className={classes.appBarSpacer} />
        <Slide in={true} direction="down">
          <Typography variant="h4" gutterBottom component="h2">
            Cadastrar Cliente
          </Typography>
        </Slide>
        <div style={{ marginTop: "20px" }} className="paper-form">
          <Zoom in={true}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleTabs}
                scrollable
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="Principal" icon={<PhoneIcon />} />
                <Tab label="Perfil" icon={<PersonPinIcon />} />
                <Tab label="Indicação" icon={<FavoriteIcon />} />
                <Tab label="Adicionais" icon={<HelpIcon />} />
              </Tabs>
            </AppBar>
          </Zoom>
          {value === 0 && <TabContainer>{this.getMainForm()}</TabContainer>}
          {value === 1 && <TabContainer>{this.getMainForm()}</TabContainer>}
          {value === 2 && <TabContainer>{this.getMainForm()}</TabContainer>}
          {value === 3 && <TabContainer>{this.getMainForm()}</TabContainer>}
        </div>
      </React.Fragment>
    );
  }
}

export default CadastrarCliente;
