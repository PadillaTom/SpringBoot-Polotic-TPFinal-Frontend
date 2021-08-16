import React, { useState } from "react";
import axios from "axios";
import MCDatepicker from "mc-datepicker";

import { useOpenFormsContext } from "../../Context/openForms_context";

import { usuariosEndpoint } from "../../Utils/constants";

// Date Picker: Fecha Nac Empleado.
const picker = MCDatepicker.create({
  el: "#datepickerEmpFechaNac",
  dateFormat: "dd-mm-yyyy",
  customWeekDays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  customMonths: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  customClearBTN: "Borrar",
  customCancelBTN: "Anular",
});

const AddEmpleado = () => {
  const { closeEmpForm } = useOpenFormsContext();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(usuariosEndpoint, {
        username: data.username,
        password: data.password,
      })
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="emp-addEmpHiddenForm" id="empForm">
      <form className="emp-addEmpForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="res-formCenter">
          <div className="res-formSection">
            <div className="res-formTitle">
              <h3>Nuevo Empleado</h3>
              <p>Ingresar los datos del nuevo empleado.</p>
            </div>
            <div className="res-formInputsContainer res-facturacionContainer">
              <div className="res-factSingleInput">
                <label htmlFor="empUsername">Usuario:</label>
                <input
                  type="text"
                  name="empUsername"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.username}
                  id="username"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empPassword">Contraseña:</label>
                <input
                  type="text"
                  name="empPassword"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.password}
                  id="password"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empDni">DNI:</label>
                <input type="text" name="empDni" required />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empNombre">Nombre:</label>
                <input type="text" name="empNombre" required />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empApellido">Apellido:</label>
                <input type="text" name="empApellido" required />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empFechaNac">Fecha Nac:</label>
                <input
                  type="text"
                  name="empFechaNac"
                  id="datepickerEmpFechaNac"
                  placeholder="Seleccionar Fecha"
                  onClick={() => {
                    picker.open();
                  }}
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empDireccion">Direccion:</label>
                <input type="text" name="empDireccion" required />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empCargo">Cargo:</label>
                <input type="text" name="empCargo" required />
              </div>
            </div>
          </div>
          <div className="emp-addEmpFormBtns">
            <input type="submit" value="Agregar" className="formBtn" />
            <button
              type="button"
              className="formBtn cancelBtn"
              onClick={() => {
                closeEmpForm();
              }}
            >
              Anular
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmpleado;
