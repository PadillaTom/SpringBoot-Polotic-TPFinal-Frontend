import React from "react";
import ReactDOM from "react-dom";

import "./CSS/index.css";

import { App } from "./Components/App";
import { OpenFormsProvider } from "./Context/openForms_context";
import { UsuariosProvider } from "./Context/usuarios_context";

ReactDOM.render(
  <UsuariosProvider>
    <OpenFormsProvider>
      <App />
    </OpenFormsProvider>
  </UsuariosProvider>,
  document.getElementById("root")
);
