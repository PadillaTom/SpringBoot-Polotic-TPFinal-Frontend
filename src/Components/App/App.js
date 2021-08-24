import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navbar } from "../Navigation";
import {
  Homepage,
  Habitaciones,
  Reservas,
  Consultas,
  Empleados,
  Utiles,
  ConfirmacinReserva,
  EdicionEmpleado,
} from "../../Pages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Homepage></Homepage>
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact>
            <Habitaciones></Habitaciones>
          </Route>
          <Route path="/reservas">
            <Reservas></Reservas>
          </Route>
          <Route path="/confirmacionReserva">
            <ConfirmacinReserva></ConfirmacinReserva>
          </Route>
          <Route path="/consultas">
            <Consultas></Consultas>
          </Route>
          <Route path="/empleados" exact>
            <Empleados></Empleados>
          </Route>
          <Route path="/utiles">
            <Utiles></Utiles>
          </Route>
          <Route path="/empleados/:id">
            <EdicionEmpleado></EdicionEmpleado>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
