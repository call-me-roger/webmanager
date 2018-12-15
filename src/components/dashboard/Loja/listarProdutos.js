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
  Button
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
  deleteProducts,
  resetProductsList
} from "../../../store/actions/productActions";

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
    id: "producttName",
    numeric: false,
    disablePadding: true,
    label: "Nome"
  },
  { id: "productPrice", numeric: true, disablePadding: false, label: "Preço" },
  {
    id: "productDepartment",
    numeric: true,
    disablePadding: false,
    label: "Departamento"
  },
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
            Todos os produtos
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

class ListarProdutos extends React.Component {
  state = {
    order: "desc",
    orderBy: "registrationDate",
    selected: [],
    products: [],
    page: 0,
    rowsPerPage: 5,
    deleteConfirmationOpen: null
  };

  componentDidMount() {
    const { products } = this.props;
    if (products) this.setProductssData(products);
  }

  componentDidUpdate() {
    const { productsListError } = this.props;
    if (productsListError) {
      window.location.reload();
    }
  }

  componentWillReceiveProps({ products, productsDeleted, productsListError }) {
    if (products) this.setProductssData(products);

    if (productsDeleted || productsListError) {
      this.setState({
        deleteConfirmationOpen: false,
        selected: []
      });
    }
  }

  redirectConfirmation = (route, routeProps = {}) => {
    this.props.resetProductsList();

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
      this.setState(state => ({ selected: state.products.map(n => n.id) }));
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
        if (this.state.products[index]) {
          selectedDocuments.push(this.state.products[index].pid);
        }
        return true;
      });
    }
    const handleClose = () => {
      this.setState({ deleteConfirmationOpen: false });
    };

    const handleDelete = () => {
      this.props.deleteProducts(selectedDocuments);
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
            Tem certeza?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialogUpdateDescription">
            Todos os dados{" "}
            {selected.length === 1
              ? "do produto selecionado"
              : `dos ${selected.length} produtos selecionados`}
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

  setProductssData = products => {
    let productsData = [];
    if (products) {
      Object.keys(products).map(index => {
        if (products[index]) {
          const productID = products[index].id;
          const { produto, preco, departamento, createdAt } = products[index];
          productsData.push({
            id: index,
            pid: productID,
            producttName: produto,
            productPrice: preco,
            productDepartment: departamento,
            registrationDate: createdAt
          });
        }
        return true;
      });
      this.setState({ products: productsData });
    }
  };

  getLoadingProgress = () => {
    return <LinearProgress color="secondary" />;
  };

  render() {
    const { classes, isRequesting, isSendingData } = this.props;
    const { snackbar } = this.props.location;
    const {
      products,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      deleteConfirmationOpen
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);
    const showLoadProgress = isRequesting || isSendingData ? true : false;

    return (
      <React.Fragment>
        <PageHeader title="Listar produtos" backRoute="/loja" />
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
              style={{ marginTop: "20px", marginBottom: "30px" }}
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
                      rowCount={products.length}
                    />
                    <TableBody>
                      {stableSort(products, getSorting(order, orderBy))
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
                                {n.producttName}
                              </TableCell>
                              <TableCell numeric>{n.productPrice}</TableCell>
                              <TableCell numeric>
                                {n.productDepartment}
                              </TableCell>
                              <TableCell>
                                <Link to={`/produtos/editar/${n.pid}`}>
                                  <EditIcon color="secondary" />
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          {products.length === 0 && !isRequesting ? (
                            <TableCell colSpan={6}>
                              <Typography align="center">
                                Nenhum produto encontrado
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
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{ "aria-label": "Página anterior" }}
                  nextIconButtonProps={{ "aria-label": "Próxima página" }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage="Produtos por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `Produtos: ${from}-${to} de ${count}`
                  }
                />
              </Paper>
            </div>
          </React.Fragment>
        </Grow>
      </React.Fragment>
    );
  }
}

ListarProdutos.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const requests = state.firestore.status.requesting;
  const isRequesting =
    requests.products === undefined ? true : requests.products;
  const { isSendingData, productsDeleted, productsListError } = state.product;
  const products = state.firestore.ordered.products;
  return {
    products,
    isRequesting,
    isSendingData,
    productsDeleted,
    productsListError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProducts: products => dispatch(deleteProducts(products)),
    resetProductsList: () => dispatch(resetProductsList())
  };
};

export default compose(
  withMultipleStyles(generalStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "products", orderBy: ["createdAt", "desc"] }])
)(ListarProdutos);
