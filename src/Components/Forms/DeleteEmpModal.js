import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useOpenFormsContext } from "../../Context/openForms_context";

import { usuariosEndpoint } from "../../Utils/constants";

const DeleteEmpModal = ({ cancelDelete, toDelete }) => {
  const history = useHistory();
  const { closeDelEmpForm } = useOpenFormsContext();

  const handleBorrar = () => {
    try {
      axios.delete(`${usuariosEndpoint}/${toDelete}`).then((res) => {
        history.go(0);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="emp-Modal" id="myModal">
      <div className="modal-content">
        <div className="modal-texts">
          <h2>Se eliminará definitivamente al Empleado y su Usuario.</h2>
          <h3>Desea continuar?</h3>
        </div>
        <div className="modal-btns">
          <div className="modal-singleBtn">
            <form>
              <input type="hidden" name="idEmp" id="inputData" />
              <button
                type="submit"
                style={{
                  outline: "none",
                  border: "none",
                  background: "#d85888 ",
                }}
                className="formBtn"
                onClick={() => {
                  handleBorrar();
                  closeDelEmpForm();
                }}
              >
                Eliminar
              </button>
            </form>
          </div>
          <div className="modal-singleBtn">
            <button
              type="submit"
              style={{
                outline: "none",
                border: "none",
                background: "#faeecf",
              }}
              onClick={() => {
                cancelDelete();
                closeDelEmpForm();
              }}
              className="formBtn"
            >
              Anular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmpModal;
