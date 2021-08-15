import {
  GET_USUARIOS_BEGIN,
  GET_USUARIOS_SUCCESS,
  GET_USUARIOS_ERROR,
} from "../actions";

const usuarios_reducer = (state, action) => {
  if (action.type === GET_USUARIOS_BEGIN) {
    return { ...state, usuarios_loading: true };
  }
  if (action.type === GET_USUARIOS_SUCCESS) {
    const usuarioAdmin = action.payload.filter((usu) => usu.id === 1);
    const restoUsuarios = action.payload.filter((usus) => usus.id !== 1);
    return {
      ...state,
      usuarios_loading: false,
      usuarios: restoUsuarios,
      usuarioAdmin: usuarioAdmin,
    };
  }
  if (action.type === GET_USUARIOS_ERROR) {
    return { ...state, usuarios_loading: false, usuarios_error: true };
  }
  return state;
};

export default usuarios_reducer;
