import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import usuariosReducer from "../Reducers/usuarios_reducer";
import {
  GET_USUARIOS_BEGIN,
  GET_USUARIOS_SUCCESS,
  GET_USUARIOS_ERROR,
} from "../actions";

// **********
// STATE
// **********
const initialState = {
  usuarios: [],
  usuarioAdmin: [],
  usuarios_loading: false,
  ususarios_error: false,
};

// Creamos Context:
const myAPI = "https://polotic-tpfinal.herokuapp.com/api/usuarios";
const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usuariosReducer, initialState);

  /* CONTEXT */
  // 1. BEGIN: ponemos Loading.
  // 2. Axios response en variable.
  // 3. SUCCESS: pasamos payload.
  // 4. useEffect on component mount.

  // *** ALL USUARIOS ***
  const fetchUsuarios = async (url) => {
    dispatch({ type: GET_USUARIOS_BEGIN });
    try {
      const response = await axios.get(url);
      const usuarios = response.data;
      dispatch({ type: GET_USUARIOS_SUCCESS, payload: usuarios });
    } catch (error) {
      dispatch({ type: GET_USUARIOS_ERROR });
    }
  };

  // *** ADMIN USUARIO ***
  // const fetchAdminUsuario = async(myAPI) => {
  //   dispatch({type: GET_ADMIN_USUARIO})
  // }

  // *** Component Mount ***
  useEffect(() => {
    fetchUsuarios(myAPI);
  }, []);

  return (
    <UsuariosContext.Provider value={{ ...state }}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuariosContext = () => {
  return useContext(UsuariosContext);
};
