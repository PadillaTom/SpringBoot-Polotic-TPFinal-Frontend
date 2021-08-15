import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navbar } from "../Navigation";
import {
  Homepage,
  Habitaciones,
  Reservas,
  Consultas,
  Empleados,
  Utiles,
} from "../../Pages";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
        <Route path="/habitaciones">
          <Habitaciones></Habitaciones>
        </Route>
        <Route path="/reservas">
          <Reservas></Reservas>
        </Route>
        <Route path="/consultas">
          <Consultas></Consultas>
        </Route>
        <Route path="/empleados">
          <Empleados></Empleados>
        </Route>
        <Route path="/utiles">
          <Utiles></Utiles>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
