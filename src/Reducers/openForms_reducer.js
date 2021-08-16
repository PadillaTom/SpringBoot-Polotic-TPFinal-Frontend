import { OPEN_ADD_EMP_FORM, CLOSE_ADD_EMP_FORM } from "../actions";

const openForms_reducer = (state, action) => {
  if (action.type === OPEN_ADD_EMP_FORM) {
    return { ...state, addEmpIsOpen: true };
  }
  if (action.type === CLOSE_ADD_EMP_FORM) {
    return { ...state, addEmpIsOpen: false };
  }
  return state;
};

export default openForms_reducer;
