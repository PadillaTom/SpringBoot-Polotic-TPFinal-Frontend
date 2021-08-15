import React from "react";
import ReactDOM from "react-dom";

import "./CSS/index.css";

import { App } from "./Components/App";
import { UsuariosProvider } from "./Context/usuarios_context";

ReactDOM.render(
  <UsuariosProvider>
    <App />
  </UsuariosProvider>,
  document.getElementById("root")
);
