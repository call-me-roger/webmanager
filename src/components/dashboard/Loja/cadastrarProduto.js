import React, { Component } from "react";
// General Classes
import { buttonTheme, generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
// import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
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
  Fab,
  Button,
  Zoom,
  LinearProgress
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
// Tabs import
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CheckIcon from "@material-ui/icons/Check";
// Custom Pallet
import { MuiThemeProvider } from "@material-ui/core/styles";
// Includes
import * as validaDados from "./validaDadosProduto";
import PageHeader from "../@includes/templates/PageHeader";
import SlideTransition from "../@includes/templates/SlideTransition";
// Database
import { compose } from "redux";
import { connect } from "react-redux";
import {
  createProduct,
  resetSubmits
} from "../../../store/actions/productActions";

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
const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      prefix="R$"
      decimalScale={2}
      fixedDecimalScale
    />
  );
};
// END Form Masks

// Main Component
class CadastrarProduto extends Component {
  state = {
    produto: "",
    preco: "",
    departamento: "",
    descricaoCurta: "",
    descricaoLonga: "",
    precoCusto: "",
    precoPromocao: "",
    marca: "",
    estoque: "",
    imagem: "",
    peso: "",
    altura: "",
    largura: "",
    comprimento: "",
    sendingData: false,
    value: 0 // Tabs
  };

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

  handleSubmit = event => {
    event.preventDefault();

    if (!this.props.isSendingData) {
      this.props.createProduct(this.state);
    }
  };
  // END Form Handles

  // Form Errors
  errProductName = () => {
    const { nome } = this.state;
    return nome && nome.length < 3;
  };

  errPrice = () => {
    const { preco } = this.state;
    return preco && preco.replace(/[^0-9.]+/g, "") <= 0;
  };

  errDepartment = () => {
    const { departamento } = this.state;
    return departamento === "";
  };
  // END Form Errors

  // Handle Functions
  handleTabs = (event, value) => {
    this.setState({ value });
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

  redirectConfirmation = route => {
    this.props.resetSubmits();
    this.props.history.push(route);
  };

  getConfirmationDialog = () => {
    const handleConfirm = () => {
      this.redirectConfirmation("/produtos/listar");
    };

    const handleClose = () => {
      this.redirectConfirmation("/loja");
    };

    return (
      <Dialog
        open={true}
        TransitionComponent={SlideTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="dialogUpdate"
        aria-describedby="dialogUpdateDescription"
      >
        <DialogTitle id="dialogUpdate" color="secondary">
          <Typography variant="inherit" color="secondary">
            Produto Adicionado
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialogUpdateDescription">
            Agora você pode editar, configurar e utilizar o produto nas funções
            da loja.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Voltar
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Listar produtos
          </Button>
        </DialogActions>
      </Dialog>
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
            error={this.errProductName() || false}
            aria-describedby="productErrorText"
            fullWidth
          >
            <InputLabel htmlFor="productErrorText">Produto*</InputLabel>
            <Input
              id="produto"
              value={this.state.produto}
              onChange={this.handleChange}
            />
            <FormHelperText id="productErrorText">
              {this.errProductName()
                ? "O nome do produto precisa ter no mínimo 3 caracteres"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl
            className={classes.fwFormControl}
            error={this.errPrice() || false}
            aria-describedby="priceErrorText"
            fullWidth
          >
            <InputLabel htmlFor="priceErrorText">Preço cliente*</InputLabel>
            <Input
              id="preco"
              value={this.state.preco}
              onChange={e => this.setState({ preco: e.target.value })}
              type="text"
              inputComponent={NumberFormatCustom}
            />
            <FormHelperText id="priceErrorText">
              {this.errPrice() ? "O preço precisa ser maior que 0,00" : null}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl
            className={classes.fwFormControl}
            error={this.errDepartment() || false}
            aria-describedby="departamentoErrorText"
            fullWidth
          >
            <InputLabel htmlFor="selectSexo">Departamento*</InputLabel>
            <Select
              value={this.state.departamento}
              onChange={this.handleSelect}
              inputProps={{ name: "departamento", id: "selectDepartamento" }}
            >
              <MenuItem value="cursos">Cursos</MenuItem>
              <MenuItem value="servicos">Serviços</MenuItem>
            </Select>
            <FormHelperText id="departamentoErrorText">
              {this.errDepartment() ? "Escolha um departamento" : null}
            </FormHelperText>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };

  getSecondaryForm = () => {
    const { classes } = this.props;
    const handleError = field => {
      switch (field) {
        case "descricaoCurta":
          return (
            (this.state.descricaoCurta &&
              this.state.descricaoCurta.length < 30) === true
          );
        case "descricaoLonga":
          return (
            (this.state.descricaoLonga &&
              this.state.descricaoLonga.length < 60) === true
          );
        default:
          return false;
      }
    };
    return (
      <React.Fragment>
        <Grid item xs={5}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errDescricaoLonga"
            error={handleError("descricaoCurta")}
          >
            <TextField
              id="descricaoCurta"
              label="Descrição curta"
              multiline
              value={this.state.descricaoCurta}
              onChange={this.handleChange}
            />
            <FormHelperText id="errDescricaoCurta">
              {handleError("descricaoCurta")
                ? "A descrição curta deve conter no mínimo 30 caracteres"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errDescricaoLonga"
            error={handleError("descricaoLonga")}
          >
            <TextField
              id="descricaoLonga"
              label="Descrição longa"
              multiline
              value={this.state.descricaoLonga}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormHelperText id="errDescricaoLonga">
            {handleError("descricaoLonga")
              ? "A descrição longa deve conter no mínimo 60 caracteres"
              : null}
          </FormHelperText>
        </Grid>
      </React.Fragment>
    );
  };

  getAdditionalInfoForm = () => {
    const { classes } = this.props;
    const handleError = field => {
      switch (field) {
        case "precoCusto":
          return (this.state.precoCusto && this.state.precoCusto < 0) === true;
        case "precoPromocao":
          return (
            (this.state.precoPromocao && this.state.precoPromocao <= 0) === true
          );
        case "estoque":
          return (this.state.estoque && this.state.estoque < 0) === true;
        default:
          return false;
      }
    };
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errPrecoCusto"
            error={handleError("precoCusto")}
          >
            <InputLabel>Custo do produto</InputLabel>
            <Input
              id="precoCusto"
              value={this.state.precoCusto}
              type="text"
              inputComponent={NumberFormatCustom}
              onChange={e => this.setState({ precoCusto: e.target.value })}
            />
            <FormHelperText id="errPrecoCusto">
              {handleError("precoCusto")
                ? "O custo do produto deve ser maior ou igual a R$ 0.00"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errPrecoPromocao"
            error={handleError("precoPromocao")}
          >
            <InputLabel>Preço em promoção</InputLabel>
            <Input
              id="precoPromocao"
              value={this.state.precoPromocao}
              type="text"
              inputComponent={NumberFormatCustom}
              onChange={e => this.setState({ precoPromocao: e.target.value })}
            />
            <FormHelperText id="errPrecoPromocao">
              {handleError("precoPromocao")
                ? "O custo do produto deve ser maior a R$ 0.00"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errEstoque"
            error={handleError("estoque")}
          >
            <InputLabel>Estoque</InputLabel>
            <Input
              id="estoque"
              value={this.state.estoque}
              onChange={this.handleChange}
              type="number"
            />
            <FormHelperText id="errEstoque">
              {handleError("estoque")
                ? "O estoque do produto deve ser maior ou igual a zero"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <InputLabel>Marca</InputLabel>
            <Select
              value={this.state.marca}
              onChange={this.handleSelect}
              inputProps={{ name: "marca", id: "selectMarca" }}
            >
              <MenuItem value="nike">Nike</MenuItem>
              <MenuItem value="apple">Apple</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.fwFormControl} fullWidth>
            <Typography
              variant="subtitle2"
              style={{ paddingTop: "5px" }}
              color="primary"
            >
              Imagem
            </Typography>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="imagem"
              type="file"
              onChange={this.handleChange}
            />
            <label htmlFor="imagem">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
                fullWidth
              >
                Selecionar imagem
              </Button>
              <Typography variant="subtitle2" style={{ paddingTop: "5px" }}>
                {this.state.imagem
                  ? this.state.imagem.replace(/^C:\\fakepath\\/i, "")
                  : null}
              </Typography>
            </label>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };

  getShippingForm = () => {
    const { classes } = this.props;
    const { largura, altura, comprimento, peso } = this.state;
    const handleError = field => {
      switch (field) {
        case "peso":
          return (this.state.peso && this.state.peso <= 0) === true;
        case "largura":
          return (this.state.largura && this.state.largura <= 0) === true;
        case "altura":
          return (this.state.altura && this.state.altura <= 0) === true;
        case "comprimento":
          return (
            (this.state.comprimento && this.state.comprimento <= 0) === true
          );
        default:
          return false;
      }
    };
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errPeso"
            error={handleError("precoPromocao")}
          >
            <InputLabel>Peso</InputLabel>
            <Input
              id="peso"
              value={peso}
              onChange={this.handleChange}
              type="number"
              placeholder="Kg"
            />
            <FormHelperText id="errPeso">
              {handleError("peso")
                ? "O peso do produto deve ser maior que zero"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errLargura"
            error={handleError("precoPromocao")}
          >
            <InputLabel>Largura</InputLabel>
            <Input
              id="largura"
              value={largura}
              onChange={this.handleChange}
              type="number"
              placeholder="cm"
            />
            <FormHelperText id="errLargura">
              {handleError("largura")
                ? "A largura do produto deve ser maior que zero"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errAltura"
            error={handleError("precoPromocao")}
          >
            <InputLabel>Altura</InputLabel>
            <Input
              id="altura"
              value={altura}
              onChange={this.handleChange}
              type="number"
              placeholder="cm"
            />
            <FormHelperText id="errAltura">
              {handleError("altura")
                ? "A altura do produto deve ser maior que zero"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl
            className={classes.fwFormControl}
            fullWidth
            aria-describedby="errComprimento"
            error={handleError("precoPromocao")}
          >
            <InputLabel>Comprimento</InputLabel>
            <Input
              id="comprimento"
              value={comprimento}
              onChange={this.handleChange}
              type="number"
              placeholder="cm"
            />
            <FormHelperText id="errComprimento">
              {handleError("comprimento")
                ? "O comprimento do produto deve ser maior que zero"
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
      </React.Fragment>
    );
  };
  // END Tabs Compoenents

  render() {
    const { createProductValidation, productCreated } = this.props;
    const { value } = this.state;
    const isSendingData = this.props.isSendingData
      ? this.props.isSendingData
      : false;
    const formValidado = validaDados.cadastro(this.state);

    return (
      <React.Fragment>
        <PageHeader title="Cadastrar produto" backRoute="/loja" />
        {isSendingData ? this.getLoadingProgress() : null}

        {productCreated ? this.getConfirmationDialog() : null}

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
                <Tab label="Essencial" icon={<ListIcon />} />
                <Tab label="Descrições" icon={<AssignmentIcon />} />
                <Tab label="Adicionais" icon={<PlaylistAddIcon />} />
                <Tab label="Frete" icon={<LocalShippingIcon />} />
              </Tabs>
            </AppBar>
          </Zoom>
          {value === 0 && <TabContainer>{this.getMainForm()}</TabContainer>}
          {value === 1 && (
            <TabContainer>{this.getSecondaryForm()}</TabContainer>
          )}
          {value === 2 && (
            <TabContainer>{this.getAdditionalInfoForm()}</TabContainer>
          )}
          {value === 3 && <TabContainer>{this.getShippingForm()}</TabContainer>}
        </div>
        {createProductValidation
          ? this.displayErrorMessage(createProductValidation)
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    createProductValidation: state.product.createProductValidation,
    isSendingData: state.product.isSendingData,
    productCreated: state.product.productCreated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
    resetSubmits: () => dispatch(resetSubmits())
  };
};

export default compose(
  withMultipleStyles(generalStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CadastrarProduto);
