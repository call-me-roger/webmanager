import React, { Component } from "react";
// General Classes
import { buttonTheme, generalStyles } from "../../@includes/themes";
import withMultipleStyles from "../../@includes/themes/withMultipleStyles";
// Material Components
import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Checkbox,
  Button,
  TextField,
  Paper
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
// Custom Pallet
import { MuiThemeProvider } from "@material-ui/core/styles";
// Includes
import PageHeader from "../../@includes/templates/PageHeader";
import CustomizedSnackbar from "../../@includes/templates/Snackbar";

class ListarDepartamentos extends Component {
  state = {
    departamentos: [
      { id: 0, title: "Eletrônicos" },
      { id: 1, title: "Cursos", categorias: [{ id: 0, title: "Finanças" }] },
      { id: 2, title: "Serviços" },
      { id: 3, title: "Lazer" }
    ],
    checked: [0],
    addDepartament: false,
    addCategory: false,
    clickedDepartment: null,
    snackbar: {
      message: null,
      variant: "success",
      open: false
    }
  };

  sortFunction = (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    return 0;
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  getRandHash = addition_string => {
    return (
      addition_string +
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };

  openDepartmentDialog = () => {
    this.setState({ addDepartament: true });
  };

  openCategoryDialog = departmentID => {
    this.setState({ addCategory: true, clickedDepartment: departmentID });
  };

  getAddDepartamentDialog = () => {
    const handleClose = () => {
      this.setState({ addDepartament: false });
    };

    const handleCreate = e => {
      const addData = {
        id: this.getRandHash("addiingDepartment"),
        title: document.getElementById("addDepartmentTitle").value
      };

      this.setState({
        departamentos: [...this.state.departamentos, addData],
        addDepartament: false,
        snackbar: {
          message: "Departamento adicionado",
          open: true
        }
      });

      setTimeout(() => {
        this.setState({
          snackbar: {
            open: false
          }
        });
      }, 5000);
    };

    return (
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="addDialog"
        key="addDepartmentDialog"
      >
        <DialogTitle id="addDialog">Adicionar Departamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após adicionar o departamento será possível complementa-lo
            adicionando categorias e subcategorias.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="addDepartmentTitle"
            label="Título do departamento"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  getAddCategoryDialog = () => {
    const handleClose = () => {
      this.setState({ addCategory: false });
    };

    const handleCreate = e => {
      const { departamentos, clickedDepartment } = this.state;
      let selectedIndex = null;
      departamentos.map(({ id }, index) => {
        if (id === clickedDepartment) {
          selectedIndex = index;
        }
        return true;
      });

      const appendCategory = {
        id: this.getRandHash("addiingCategory"),
        title: document.getElementById("addCategoryTitle").value
      };
      let newDepartamentos = [...departamentos];

      if (!newDepartamentos[selectedIndex].categorias) {
        newDepartamentos[selectedIndex].categorias = [{ ...appendCategory }];
      } else {
        newDepartamentos[selectedIndex].categorias = [
          ...newDepartamentos[selectedIndex].categorias,
          {
            id: this.getRandHash("addiingCategory"),
            title: document.getElementById("addCategoryTitle").value
          }
        ];
      }

      if (selectedIndex !== null) {
        this.setState({
          departamentos: newDepartamentos,
          addCategory: false,
          snackbar: {
            message: "Categoria adicionada",
            variant: "success",
            open: true
          }
        });
      } else {
        this.setState({
          addCategory: false,
          snackbar: {
            message: "Ocorreu um erro",
            variant: "error",
            open: true
          }
        });
      }

      setTimeout(() => {
        this.setState({
          snackbar: {
            open: false
          }
        });
      }, 5000);
    };

    return (
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="addDialog"
        key="addDepartmentDialog"
      >
        <DialogTitle id="addDialog">Adicionar Categoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após adicionar a categoria será possível complementa-la adicionando
            subcategorias.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="addCategoryTitle"
            label="Título da categoria"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { classes } = this.props;
    const {
      departamentos,
      checked,
      addDepartament,
      addCategory,
      snackbar
    } = this.state;
    return (
      <React.Fragment>
        <PageHeader
          title="Gerenciar departamentos"
          description="Listando todos os departamentos"
          backRoute="/loja"
        />
        {addDepartament && this.getAddDepartamentDialog()}
        {addCategory && this.getAddCategoryDialog()}

        <CustomizedSnackbar
          variant={snackbar.variant}
          message={snackbar.message}
          open={true}
        />

        <Grid container>
          <Grid item xs={12} sm={8}>
            <Button
              color="primary"
              variant="outlined"
              className={classes.ctrlButtonML}
              onClick={this.openDepartmentDialog}
            >
              <AddIcon /> Departamento
            </Button>
            <MuiThemeProvider theme={buttonTheme}>
              {checked.length > 0 && (
                <Button
                  color="secondary"
                  variant="outlined"
                  className={classes.ctrlButtonML}
                >
                  <DeleteIcon />{" "}
                  {checked.length === 1
                    ? "1 selecionado"
                    : `${checked.length} selecionados`}
                </Button>
              )}
            </MuiThemeProvider>
            <Paper style={{ marginTop: "20px" }}>
              <List style={{ width: "100%" }}>
                {departamentos
                  .sort(this.sortFunction)
                  .map(({ id, title, categorias }) => {
                    const MainList = (
                      <ListItem
                        key={id}
                        role={undefined}
                        dense
                        button
                        onClick={this.handleToggle(id)}
                      >
                        <Checkbox
                          checked={checked.indexOf(id) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Adicionar categoria"
                            onClick={() => this.openCategoryDialog(id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                    const CategoryList = () => {
                      if (categorias && categorias.length > 0) {
                        return categorias
                          .sort(this.sortFunction)
                          .map(({ id, title }) => (
                            <ListItem
                              key={id}
                              role={undefined}
                              dense
                              button
                              onClick={this.handleToggle(id)}
                              style={{
                                paddingLeft: "75px",
                                backgroundColor: "#f0f0f0"
                              }}
                            >
                              <Checkbox
                                checked={checked.indexOf(id) !== -1}
                                tabIndex={-1}
                                disableRipple
                              />
                              <ListItemText primary={title} />
                              <ListItemSecondaryAction>
                                <IconButton aria-label="Adicionar categoria">
                                  <AddIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ));
                      }
                    };
                    return [MainList, CategoryList()];
                  })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withMultipleStyles(generalStyles)(ListarDepartamentos);
