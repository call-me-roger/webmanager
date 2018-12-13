import React, { Component } from "react";
// General Classes
import { buttonTheme, generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// Material Components
import {
  Typography,
  Grid,
  FormControl,
  Input,
  InputLabel,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
  Paper,
  Modal,
  Fab,
  Button,
  Zoom,
  Tooltip,
  LinearProgress
} from "@material-ui/core";
import MaskedInput from "react-text-mask";
// Tabs import
import { AppBar, Tabs, Tab } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import PlaceIcon from "@material-ui/icons/Place";
import CheckIcon from "@material-ui/icons/Check";
// Custom Pallet
import { MuiThemeProvider } from "@material-ui/core/styles";
// Includes
import * as validator from "../@functions/validator";
import * as validaDados from "./validaDados";
import PageHeader from "../@includes/templates/PageHeader";
// Database
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  updateClient,
  resetSubmits
} from "../../../store/actions/clientActions";

function TabContainer(props) {
  return (
    <Paper elevation={3} square>
      <Grid container spacing={32} style={{ marginTop: 0 }}>
        {props.children}
      </Grid>
    </Paper>
  );
}

// Form Masks
function PhoneMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
    />
  );
}

function CPFMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        /[0-9]/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ]}
    />
  );
}

function CEPMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
    />
  );
}
// END Form Masks

// Main Component
class EditarCliente extends Component {
  state = {
    nome: "",
    email: "",
    celular: "",
    cpf: "",
    profissao: "",
    dataNascimento: "",
    sexo: "masculino",
    indicacao: {
      value: 0,
      complemento: ""
    },
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    cepError: false,
    sendingData: false,
    value: 0 // Tabs
  };

  constructor(props) {
    super(props);
    const { clientData } = props;
    if (clientData) {
      this.state = {
        ...this.state,
        ...clientData
      };
    }
  }

  componentWillReceiveProps({ clientData }) {
    if (clientData) this.setState({ ...clientData });
  }

  // Form Handles
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleIndicacaoVal = e => {
    this.setState({
      indicacao: {
        value: e.target.value,
        complemento: this.state.indicacao.complemento
      }
    });
  };

  handleIndicacaoComp = e => {
    this.setState({
      indicacao: {
        value: this.state.indicacao.value,
        complemento: e.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { cid } = this.props.match.params;
    if (!this.props.isSendingData) {
      this.props.updateClient({ ...this.state, cid: cid });
    }
  };
  // END Form Handles

  // Form Errors
  errName = () => {
    const { nome } = this.state;
    return nome && nome.length < 3;
  };

  errEmail = () => {
    const { email } = this.state;
    return email && !validator.isEmail(email);
  };

  errCelular = () => {
    const { celular } = this.state;
    const cleanedCelular = celular.replace(/[^0-9.]+/g, "");
    return celular && cleanedCelular.length < 10;
  };
  // END Form Errors

  // Handle Functions
  handleTabs = (event, value) => {
    this.setState({ value });
  };

  handleBuscaCEP = () => {
    const cleanedCEP = this.state.cep.replace(/[^0-9.]+/g, "");
    const searchURL = `https://viacep.com.br/ws/${cleanedCEP}/json/`;

    const resetAddress = (err = false) => {
      this.setState({
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        cepError: err
      });
    };

    if (cleanedCEP.length === 8) {
      fetch(searchURL)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.setState({
              estado: data.uf,
              cidade: data.localidade,
              bairro: data.bairro,
              rua: data.logradouro,
              cepError: false
            });
          } else {
            resetAddress(true);
          }
        });
    } else if (cleanedCEP.length > 0) {
      resetAddress(true);
    } else {
      resetAddress(false);
    }
  };

  getLoadingProgress = () => {
    return <LinearProgress color="secondary" />;
  };

  displayErrorMessage = message => {
    return (
      <Paper
        style={{ padding: "8px 16px 8px 16px", margin: "10px 0 15px 0" }}
        elevation={3}
      >
        <Typography variant="subtitle1" color="error">
          {message}
        </Typography>
      </Paper>
    );
  };

  rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };

  getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  };

  redirectConfirmation = route => {
    this.props.resetSubmits();
    this.props.history.push(route);
  };

  getConfirmationModal = () => {
    const { cid } = this.props.match.params;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={true}
      >
        <div style={this.getModalStyle()} className={this.props.classes.paper}>
          <Typography variant="h6" id="modal-title" color="secondary">
            Cliente Atualizado
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Todos os dados do cliente foram atualizados no sistema.
          </Typography>
          <Grid
            container
            justify="space-between"
            style={{ paddingTop: "10px" }}
          >
            <Button
              onClick={() =>
                this.redirectConfirmation("/clientes/editar/" + cid)
              }
              variant="contained"
              id="voltar"
            >
              Voltar
            </Button>
            <Button
              onClick={() => this.redirectConfirmation("/clientes/listar")}
              variant="contained"
              color="primary"
              id="listar"
            >
              Listar clientes
            </Button>
          </Grid>
        </div>
      </Modal>
    );
  };

  // END Handle Functions

  // Tabs Components
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
            <InputLabel htmlFor="nome-error-text">Nome Completo*</InputLabel>
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
            <InputLabel htmlFor="email-error-text">Email*</InputLabel>
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
            <InputLabel htmlFor="celular-error-text">Celular*</InputLabel>
            <Input
              id="celular"
              value={this.state.celular}
              onChange={this.handleChange}
              type="tel"
              inputComponent={PhoneMask}
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

  getSecondaryForm = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <FormControl
            className={classes.fwFormControl}
            error={
              (this.state.cpf && !validator.isCPF(this.state.cpf)) || false
            }
            aria-describedby="cpf-error-text"
            fullWidth
          >
            <InputLabel htmlFor="cpf-error-text">CPF</InputLabel>
            <Input
              id="cpf"
              value={this.state.cpf}
              onChange={this.handleChange}
              inputComponent={CPFMask}
            />
            <FormHelperText id="cpf-error-text">
              {this.state.cpf && !validator.isCPF(this.state.cpf)
                ? "Preencha o CPF corretamente"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel htmlFor="profissao-error-text">Profissão</InputLabel>
            <Input
              id="profissao"
              value={this.state.profissao}
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <TextField
              id="dataNascimento"
              label="Data de Nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={this.handleChange}
              value={this.state.dataNascimento}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel htmlFor="selectSexo">Sexo</InputLabel>
            <Select
              value={this.state.sexo}
              onChange={this.handleSelect}
              inputProps={{ name: "sexo", id: "selectSexo" }}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };

  getIndicationForm = () => {
    const { classes } = this.props;
    const selectSite = () => {
      return (
        <Grid item xs={4}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel>Qual site?</InputLabel>
            <Input
              id="indicacaoComplemento"
              value={this.state.indicacao.complemento}
              onChange={this.handleIndicacaoComp}
            />
          </FormControl>
        </Grid>
      );
    };
    const selectRedeSocial = () => {
      return (
        <Grid item xs={4}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel>Qual rede social?</InputLabel>
            <Select
              value={this.state.indicacao.complemento}
              onChange={this.handleIndicacaoComp}
              inputProps={{
                name: "indicacaoComplemento",
                id: "selectIndicacaoComplemento"
              }}
            >
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Youtube">Youtube</MenuItem>
              <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    };

    return (
      <React.Fragment>
        <Grid item xs={4}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel htmlFor="selectIndicacao">
              Como o cliente conheceu a loja?
            </InputLabel>
            <Select
              value={this.state.indicacao.value}
              onChange={this.handleIndicacaoVal}
              inputProps={{ name: "indicacao", id: "selectIndicacao" }}
            >
              <MenuItem value={0}>Indicação</MenuItem>
              <MenuItem value={1}>Google</MenuItem>
              <MenuItem value={2}>Redes Sociais</MenuItem>
              <MenuItem value={3}>Blog ou site</MenuItem>
              <MenuItem value={4}>Televisão</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {this.state.indicacao.value === 2 ? selectRedeSocial() : null}
        {this.state.indicacao.value === 3 ? selectSite() : null}
      </React.Fragment>
    );
  };

  getAddressForm = () => {
    const { classes } = this.props;
    const cleanedCEP = this.state.cep.replace(/[^0-9.]+/g, "");
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            error={this.state.cepError || false}
            aria-describedby="cep-error-text"
            fullWidth
          >
            <InputLabel htmlFor="cep-error-text">CEP</InputLabel>
            <Input
              id="cep"
              value={this.state.cep}
              onChange={this.handleChange}
              onKeyUp={this.handleBuscaCEP}
              inputComponent={CEPMask}
            />
            <FormHelperText id="cep-error-text">
              {this.state.cepError ? "Preencha o CEP corretamente" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            error={this.state.cepError || false}
            aria-describedby="estado-error-text"
            fullWidth
          >
            <InputLabel htmlFor="estado-error-text">Estado</InputLabel>
            <Tooltip
              title="Preencha o CEP"
              disableHoverListener={
                !this.state.cepError && cleanedCEP.length === 8
              }
              placement="bottom"
            >
              <Input id="estado" value={this.state.estado} readOnly />
            </Tooltip>
            <FormHelperText id="estado-error-text">
              {this.state.cepError ? "CEP incorreto" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            error={this.state.cepError || false}
            aria-describedby="cidade-error-text"
            fullWidth
          >
            <InputLabel htmlFor="cidade-error-text">Cidade</InputLabel>
            <Tooltip
              title="Preencha o CEP"
              disableHoverListener={
                !this.state.cepError && cleanedCEP.length === 8
              }
              placement="bottom"
            >
              <Input id="cidade" value={this.state.cidade} readOnly />
            </Tooltip>
            <FormHelperText id="cidade-error-text">
              {this.state.cepError ? "CEP incorreto" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            error={this.state.cepError || false}
            aria-describedby="bairro-error-text"
            fullWidth
          >
            <InputLabel htmlFor="bairro-error-text">Bairro</InputLabel>
            <Tooltip
              title="Preencha o CEP"
              disableHoverListener={
                !this.state.cepError && cleanedCEP.length === 8
              }
              placement="bottom"
            >
              <Input id="bairro" value={this.state.bairro} readOnly />
            </Tooltip>
            <FormHelperText id="bairro-error-text">
              {this.state.cepError ? "CEP incorreto" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl
            className={classes.fwFormControl}
            error={this.state.cepError || false}
            aria-describedby="rua-error-text"
            fullWidth
          >
            <InputLabel htmlFor="rua-error-text">Rua</InputLabel>
            <Tooltip
              title="Preencha o CEP"
              disableHoverListener={
                !this.state.cepError && cleanedCEP.length === 8
              }
              placement="bottom"
            >
              <Input id="rua" value={this.state.rua} readOnly />
            </Tooltip>
            <FormHelperText id="rua-error-text">
              {this.state.cepError ? "CEP incorreto" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel htmlFor="numero-error-text">Número</InputLabel>
            <Input
              id="numero"
              value={this.state.numero}
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel htmlFor="complemento-error-text">
              Complemento
            </InputLabel>
            <Input
              id="complemento"
              value={this.state.complemento}
              onChange={this.handleChange}
            />
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };
  // END Tabs Compoenents

  render() {
    const { createClientValidation, clientUpdated, isRequesting } = this.props;
    const { value } = this.state;
    const isSendingData = this.props.isSendingData
      ? this.props.isSendingData
      : false;
    const formValidado = validaDados.cadastro(this.state);

    return (
      <React.Fragment>
        <PageHeader
          title="Informações do cliente"
          backRoute="/clientes/listar"
        />
        {isSendingData || isRequesting ? this.getLoadingProgress() : null}

        {clientUpdated ? this.getConfirmationModal() : null}

        {!isRequesting && (
          <Grid className="wrap-content">
            <div
              style={{ marginTop: "20px", marginBottom: "30px" }}
              className="paper-form"
            >
              <Zoom in={true}>
                <AppBar position="static" color="default" elevation={2}>
                  <Tabs
                    value={value}
                    onChange={this.handleTabs}
                    scrollable
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    <Tab label="Essencial" icon={<PhoneIcon />} />
                    <Tab label="Perfil" icon={<PersonPinIcon />} />
                    <Tab label="Indicação" icon={<FavoriteIcon />} />
                    <Tab label="Endereço" icon={<PlaceIcon />} />
                  </Tabs>
                </AppBar>
              </Zoom>
              {value === 0 && <TabContainer>{this.getMainForm()}</TabContainer>}
              {value === 1 && (
                <TabContainer>{this.getSecondaryForm()}</TabContainer>
              )}
              {value === 2 && (
                <TabContainer>{this.getIndicationForm()}</TabContainer>
              )}
              {value === 3 && (
                <TabContainer>{this.getAddressForm()}</TabContainer>
              )}
            </div>
            {createClientValidation
              ? this.displayErrorMessage(createClientValidation)
              : null}
            <Grid container justify="flex-end">
              <MuiThemeProvider theme={buttonTheme}>
                <Fab
                  color="primary"
                  disabled={!formValidado}
                  onClick={this.handleSubmit}
                >
                  <CheckIcon />
                </Fab>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        )}
        {isRequesting && (
          <Typography align="center" style={{ paddingTop: "15px" }}>
            Carregando...
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cid } = ownProps.match.params;
  const requests = state.firestore.status.requesting;
  const isRequesting = requests.clients === undefined ? true : requests.clients;
  const clients = state.firestore.data.clients;
  const clientInformation = clients ? clients[cid] : null;
  const isSendingData = state.client.isSendingData;
  if (state.client.isSendingData) {
    console.log("maping");
  }

  const defaultData = {
    createClientValidation: state.client.createClientValidation,
    clientUpdated: state.client.clientUpdated,
    isSendingData,
    clientInformation,
    isRequesting
  };

  const clientData = !isSendingData ? clientInformation : null;

  return { ...defaultData, clientData };
};

const mapDispatchToProps = dispatch => {
  return {
    updateClient: client => dispatch(updateClient(client)),
    resetSubmits: () => dispatch(resetSubmits())
  };
};

export default compose(
  withMultipleStyles(generalStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "clients" }])
)(EditarCliente);
