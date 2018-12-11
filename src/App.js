import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "moment/locale/pt-br";

import Dashboard from "./components/Dashboard";
import Inicio from "./components/dashboard/Inicio";
import Vendas from "./components/dashboard/Vendas";
import Clientes from "./components/dashboard/Clientes";
import CadastrarCliente from "./components/dashboard/Clientes/cadastrar";
import Relatorios from "./components/dashboard/Relatorios";
import Integracoes from "./components/dashboard/Integracoes";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
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
              path="/relatorios/:relatorio?"
              render={() => <Dashboard Component={Relatorios} />}
            />
            <Route
              path="/integracoes"
              render={() => <Dashboard Component={Integracoes} />}
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
