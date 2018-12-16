import React from "react";
import { Link } from "react-router-dom";
// General Classes
import { generalStyles } from "../@includes/themes";
import withMultipleStyles from "../@includes/themes/withMultipleStyles";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// Material Compoenents
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Grow,
  Paper,
  Checkbox,
  LinearProgress,
  Button,
  Grid
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Material Icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
// Database
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
// Complements
import moment from "moment";
import PageHeader from "../@includes/templates/PageHeader";
import SlideTransition from "../@includes/templates/SlideTransition";
import CustomizedSnackbar from "../@includes/templates/Snackbar";
import {
  deleteClients,
  resetClientsList
} from "../../../store/actions/clientActions";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "registrationDate",
    numeric: false,
    disablePadding: true,
    label: "Cadastro"
  },
  {
    id: "clientName",
    numeric: false,
    disablePadding: true,
    label: "Nome"
  },
  { id: "clientEmail", numeric: true, disablePadding: false, label: "Email" },
  { id: "clientPhone", numeric: true, disablePadding: false, label: "Celular" },
  { id: "edit", numeric: false, disablePadding: false, label: "Editar" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, openDeleteDialog } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} Selecionados
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Todos os clientes
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Excluir">
            <IconButton aria-label="Excluir" onClick={openDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filtrar lista">
            <IconButton aria-label="Filtrar lista">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class ListarClientes extends React.Component {
  state = {
    order: "desc",
    orderBy: "registrationDate",
    selected: [],
    clients: [],
    page: 0,
    rowsPerPage: 5,
    deleteConfirmationOpen: null
  };

  componentDidMount() {
    const { clients } = this.props;
    if (clients) this.setClientsData(clients);
  }

  componentDidUpdate() {
    const { clientsListError } = this.props;
    if (clientsListError) {
      window.location.reload();
    }
  }

  componentWillReceiveProps({ clients, clientsDeleted, clientsListError }) {
    if (clients) this.setClientsData(clients);

    if (clientsDeleted || clientsListError) {
      this.setState({
        deleteConfirmationOpen: false,
        selected: []
      });
    }
  }

  redirectConfirmation = (route, routeProps = {}) => {
    this.props.resetClientsList();

    const redirectData = {
      pathname: route,
      ...routeProps
    };

    this.props.history.push(redirectData);
  };

  // Table Functions
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.clients.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  openDeleteDialog = () => {
    this.setState({
      deleteConfirmationOpen: true
    });
  };

  getDeleteConfirmationDialog = () => {
    const { selected } = this.state;
    let selectedDocuments = [];
    if (selected && selected.length > 0) {
      selected.map(index => {
        if (this.state.clients[index]) {
          selectedDocuments.push(this.state.clients[index].cid);
        }
        return true;
      });
    }
    const handleClose = () => {
      this.setState({ deleteConfirmationOpen: false });
    };

    const handleDelete = () => {
      this.props.deleteClients(selectedDocuments);
    };

    return (
      <Dialog
        open={true}
        TransitionComponent={SlideTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="dialogUpdateClient"
        aria-describedby="dialogUpdateClientDescription"
      >
        <DialogTitle id="dialogUpdateClient" color="secondary">
          <Typography variant="inherit" color="secondary">
            Tem certeza?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialogUpdateClientDescription">
            Todos os dados{" "}
            {selected.length === 1
              ? "do cliente selecionado"
              : `dos ${selected.length} clientes selecionados`}
            {" serão removidos do sistema"}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  // END Table Functions

  setClientsData = clients => {
    let clientsData = [];
    if (clients) {
      Object.keys(clients).map(index => {
        if (clients[index]) {
          const clientID = clients[index].id;
          const { nome, email, celular, createdAt } = clients[index];
          clientsData.push({
            id: index,
            cid: clientID,
            clientName: nome,
            clientEmail: email,
            clientPhone: celular,
            registrationDate: createdAt
          });
        }
        return true;
      });
      this.setState({ clients: clientsData });
    }
  };

  getLoadingProgress = () => {
    return <LinearProgress color="secondary" />;
  };

  render() {
    const { classes, isRequesting, isSendingData } = this.props;
    const { snackbar } = this.props.location;
    const {
      clients,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      deleteConfirmationOpen
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);
    const showLoadProgress = isRequesting || isSendingData ? true : false;

    return (
      <React.Fragment>
        <PageHeader title="Listar clientes" backRoute="/clientes" />
        {showLoadProgress ? this.getLoadingProgress() : null}
        {deleteConfirmationOpen && this.getDeleteConfirmationDialog()}

        {snackbar && (
          <CustomizedSnackbar
            variant={snackbar.variant}
            message={snackbar.message}
            open={true}
          />
        )}

        <Grow in={true}>
          <React.Fragment>
            <div
              className={classes.tableContainer}
              style={{ marginTop: "20px", marginBottom: "120px" }}
            >
              <Paper className={classes.root}>
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  openDeleteDialog={this.openDeleteDialog}
                />
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={clients.length}
                    />
                    <TableBody>
                      {stableSort(clients, getSorting(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(n => {
                          const isSelected = this.isSelected(n.id);
                          return (
                            <TableRow
                              hover
                              onClick={event => this.handleClick(event, n.id)}
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.id}
                              selected={isSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                {moment(n.registrationDate.toDate()).calendar()}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                {n.clientName}
                              </TableCell>
                              <TableCell numeric>{n.clientEmail}</TableCell>
                              <TableCell numeric>{n.clientPhone}</TableCell>
                              <TableCell>
                                <Link to={`/clientes/editar/${n.cid}`}>
                                  <EditIcon color="secondary" />
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          {clients.length === 0 && !isRequesting ? (
                            <TableCell colSpan={6}>
                              <Typography align="center">
                                Nenhum cliente encontrado
                              </Typography>
                            </TableCell>
                          ) : null}
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={clients.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{ "aria-label": "Página anterior" }}
                  nextIconButtonProps={{ "aria-label": "Próxima página" }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage="Clientes por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `Clientes: ${from}-${to} de ${count}`
                  }
                />
              </Paper>
            </div>
          </React.Fragment>
        </Grow>
        <Grid container justify="flex-end">
          <Link to="/clientes/cadastrar">
            <Button variant="outlined" color="secondary">
              <AddIcon color="inherit" /> NOVO CLIENTE
            </Button>
          </Link>
        </Grid>
      </React.Fragment>
    );
  }
}

ListarClientes.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const requests = state.firestore.status.requesting;
  const isRequesting = requests.clients === undefined ? true : requests.clients;
  const { isSendingData, clientsDeleted, clientsListError } = state.client;
  const clients = state.firestore.ordered.clients;
  return {
    clients,
    isRequesting,
    isSendingData,
    clientsDeleted,
    clientsListError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteClients: clients => dispatch(deleteClients(clients)),
    resetClientsList: () => dispatch(resetClientsList())
  };
};

export default compose(
  withMultipleStyles(generalStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "clients", orderBy: ["createdAt", "desc"] }])
)(ListarClientes);
