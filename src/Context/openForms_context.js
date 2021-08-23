import React, { createContext, useReducer, useContext } from "react";

import {
  OPEN_ADD_EMP_FORM,
  CLOSE_ADD_EMP_FORM,
  OPEN_DEL_EMP_FORM,
  CLOSE_DEL_EMP_FORM,
} from "../actions";

import openFormsReducer from "../Reducers/openForms_reducer";

// **********
// STATE
// **********
const initialState = {
  addEmpIsOpen: false,
  deleteEmpIsOpen: false,
};

const OpenFormsContext = createContext();

export const OpenFormsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(openFormsReducer, initialState);

  // Add
  const openEmpForm = () => {
    dispatch({ type: OPEN_ADD_EMP_FORM });
  };
  const closeEmpForm = () => {
    dispatch({ type: CLOSE_ADD_EMP_FORM });
  };

  // Delete
  const openDelEmpForm = () => {
    dispatch({ type: OPEN_DEL_EMP_FORM });
  };
  const closeDelEmpForm = () => {
    dispatch({ type: CLOSE_DEL_EMP_FORM });
  };

  return (
    <OpenFormsContext.Provider
      value={{
        ...state,
        openEmpForm,
        closeEmpForm,
        openDelEmpForm,
        closeDelEmpForm,
      }}
    >
      {children}
    </OpenFormsContext.Provider>
  );
};

export const useOpenFormsContext = () => {
  return useContext(OpenFormsContext);
};
