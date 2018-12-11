import React, { Component } from "react";
import { Link } from "react-router-dom";
// Components
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader
} from "@material-ui/core";
// Icones
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

class NavgationLinks extends Component {
  render() {
    const { currentRoute } = this.props;
    return (
      <React.Fragment>
        <Link to="/">
          <ListItem button selected={currentRoute === "/"}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Geral" />
          </ListItem>
        </Link>
        <Link to="/vendas">
          <ListItem button selected={currentRoute.includes("/vendas")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Vendas" />
          </ListItem>
        </Link>
        <Link to="/clientes">
          <ListItem button selected={currentRoute.includes("/clientes")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
        </Link>
        <Link to="/relatorios">
          <ListItem button selected={currentRoute === "/relatorios"}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItem>
        </Link>
        <Link to="/integracoes">
          <ListItem button selected={currentRoute.includes("/integracoes")}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrações" />
          </ListItem>
        </Link>
        <Divider />
        <ListSubheader inset>Relatórios rápidos</ListSubheader>
        <Link to="/relatorios/mes">
          <ListItem button selected={currentRoute.includes("/relatorios/mes")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Este mês" />
          </ListItem>
        </Link>
        <Link to="/relatorios/semestre">
          <ListItem
            button
            selected={currentRoute.includes("/relatorios/semestre")}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Este semestre" />
          </ListItem>
        </Link>
        <Link to="/relatorios/ano">
          <ListItem button selected={currentRoute.includes("/relatorios/ano")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Este ano" />
          </ListItem>
        </Link>
      </React.Fragment>
    );
  }
}

export default NavgationLinks;
