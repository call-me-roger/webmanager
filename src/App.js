import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "moment/locale/pt-br";

import Dashboard from "./components/Dashboard";
import Inicio from "./components/dashboard/Inicio";
import Vendas from "./components/dashboard/Vendas";
// Clientes
import Clientes from "./components/dashboard/Clientes";
import CadastrarCliente from "./components/dashboard/Clientes/cadastrar";
import ListarClientes from "./components/dashboard/Clientes/listar";
import EditarCliente from "./components/dashboard/Clientes/editar";
// Loja
import Loja from "./components/dashboard/Loja";
import CadastrarProduto from "./components/dashboard/Loja/produtos/cadastrarProduto";
import ListarProdutos from "./components/dashboard/Loja/produtos/listarProdutos";
import EditarProduto from "./components/dashboard/Loja/produtos/editarProduto";
import ListarDepartamentos from "./components/dashboard/Loja/departamentos/listarDepartamentos";
import ListarMarcas from "./components/dashboard/Loja/marcas/listarMarcas";
import Relatorios from "./components/dashboard/Relatorios";
import Integracoes from "./components/dashboard/Integracoes";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Dashboard Component={Inicio} />}
          />
          <Route
            path="/vendas"
            render={() => <Dashboard Component={Vendas} />}
          />

          <Route
            exact
            path="/clientes"
            render={() => <Dashboard Component={Clientes} />}
          />
          <Route
            path="/clientes/cadastrar"
            render={() => <Dashboard Component={CadastrarCliente} />}
          />
          <Route
            path="/clientes/listar"
            render={() => <Dashboard Component={ListarClientes} />}
          />
          <Route
            path="/clientes/editar/:cid"
            render={() => <Dashboard Component={EditarCliente} />}
          />

          <Route
            exact
            path="/loja"
            render={() => <Dashboard Component={Loja} />}
          />
          <Route
            exact
            path="/loja/produtos/cadastrar"
            render={() => <Dashboard Component={CadastrarProduto} />}
          />
          <Route
            exact
            path="/loja/produtos/listar"
            render={() => <Dashboard Component={ListarProdutos} />}
          />
          <Route
            path="/loja/produtos/editar/:pid"
            render={() => <Dashboard Component={EditarProduto} />}
          />
          <Route
            path="/loja/departamentos/listar"
            render={() => <Dashboard Component={ListarDepartamentos} />}
          />
          <Route
            path="/loja/marcas/listar"
            render={() => <Dashboard Component={ListarMarcas} />}
          />

          <Route
            path="/relatorios/:relatorio?"
            render={() => <Dashboard Component={Relatorios} />}
          />
          <Route
            path="/integracoes"
            render={() => <Dashboard Component={Integracoes} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
