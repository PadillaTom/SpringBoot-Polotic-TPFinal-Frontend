import React, { createContext, useReducer, useContext } from "react";

import { OPEN_ADD_EMP_FORM, CLOSE_ADD_EMP_FORM } from "../actions";

import openFormsReducer from "../Reducers/openForms_reducer";

// **********
// STATE
// **********
const initialState = {
  addEmpIsOpen: false,
};

const OpenFormsContext = createContext();

export const OpenFormsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(openFormsReducer, initialState);

  const openEmpForm = () => {
    dispatch({ type: OPEN_ADD_EMP_FORM });
  };
  const closeEmpForm = () => {
    dispatch({ type: CLOSE_ADD_EMP_FORM });
  };

  return (
    <OpenFormsContext.Provider value={{ ...state, openEmpForm, closeEmpForm }}>
      {children}
    </OpenFormsContext.Provider>
  );
};

export const useOpenFormsContext = () => {
  return useContext(OpenFormsContext);
};
