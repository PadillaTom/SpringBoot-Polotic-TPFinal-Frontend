import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MCDatepicker from "mc-datepicker";

import { useOpenFormsContext } from "../../Context/openForms_context";

import { usuariosEndpoint, usuariosEndpointLocal } from "../../Utils/constants";

const AddEmpleado = () => {
  // Date Picker: Fecha Nac Empleado.
  const picker = MCDatepicker.create({
    el: "#fechaNacEmpleado",
    dateFormat: "MM-dd-yyyy",
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
  const history = useHistory();
  const { closeEmpForm } = useOpenFormsContext();
  const [data, setData] = useState({
    username: "",
    password: "",
    dniEmpleado: "",
    nombreEmpleado: "",
    apellidoEmpleado: "",
    fechaNacEmpleado: "",
    direccionEmpleado: "",
    cargoEmpleado: "",
  });

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaDate = new Date(data.fechaNacEmpleado).addHours(7);
    console.log(fechaDate);
    const newUsuario = {
      username: data.username,
      password: data.password,
      usuEmpleado: {
        dniEmpleado: data.dniEmpleado,
        nombreEmpleado: data.nombreEmpleado,
        apellidoEmpleado: data.apellidoEmpleado,
        fechaNacEmpleado: fechaDate,
        direccionEmpleado: data.direccionEmpleado,
        cargoEmpleado: data.cargoEmpleado,
      },
    };
    try {
      axios.post(usuariosEndpoint, newUsuario).then((res) => {
        closeEmpForm();
        history.go(0);
      });
    } catch (error) {
      console.log(`Error Post Empleados: ${error}`);
    }
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
                <input
                  type="text"
                  name="empDni"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.dniEmpleado}
                  id="dniEmpleado"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empNombre">Nombre:</label>
                <input
                  type="text"
                  name="empNombre"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.nombreEmpleado}
                  id="nombreEmpleado"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empApellido">Apellido:</label>
                <input
                  type="text"
                  name="empApellido"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.apellidoEmpleado}
                  id="apellidoEmpleado"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empFechaNac">Fecha Nac:</label>
                <input
                  type="text"
                  name="empFechaNac"
                  placeholder="Seleccionar Fecha"
                  required
                  onFocus={() => {
                    picker.open();
                  }}
                  onChange={(e) => handleChange(e)}
                  value={picker.onSelect((date, formatedDate) => {
                    data.fechaNacEmpleado = formatedDate;
                  })}
                  id="fechaNacEmpleado"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empDireccion">Direccion:</label>
                <input
                  type="text"
                  name="empDireccion"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.direccionEmpleado}
                  id="direccionEmpleado"
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="empCargo">Cargo:</label>
                <input
                  type="text"
                  name="empCargo"
                  required
                  onChange={(e) => handleChange(e)}
                  value={data.cargoEmpleado}
                  id="cargoEmpleado"
                />
              </div>
            </div>
          </div>
          <div className="emp-addEmpFormBtns">
            <button type="submit" className="formBtn">
              Agregar
            </button>
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
