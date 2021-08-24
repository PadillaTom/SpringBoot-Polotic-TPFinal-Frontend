/* eslint-disable no-extend-native */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import MCDatepicker from "mc-datepicker";

import { usuariosEndpoint } from "../Utils/constants";

import { transformarFecha } from "../Utils/helpers";

const EdicionEmpleado = () => {
  const { id } = useParams();
  const editLink = `${usuariosEndpoint}/${id}`;
  const history = useHistory();
  const history2 = createBrowserHistory({ forceRefresh: true });

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

  // Date Picker: Fecha Nac Empleado.
  const picker = MCDatepicker.create({
    el: "#fechaNacEmpleado",
    dateFormat: "MM-dd-yyyy",
    selectedDate: new Date(data.fechaNacEmpleado),
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
  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  Date.prototype.addHours = function (hour) {
    this.setTime(this.getTime() + hour * 60 * 60 * 1000);
    return this;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaDate = new Date(data.fechaNacEmpleado).addHours(7);
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
      axios.put(`${usuariosEndpoint}/${id}`, newUsuario).then(() => {
        history2.push("/empleados");
      });
    } catch (error) {
      console.log(`Error Post Empleados: ${error}`);
    }
  };

  const fetchEdit = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        const usu = res.data;
        const emp = usu.usuEmpleado;
        setData({
          username: usu.username,
          password: usu.password,
          dniEmpleado: emp.dniEmpleado,
          nombreEmpleado: emp.nombreEmpleado,
          apellidoEmpleado: emp.apellidoEmpleado,
          fechaNacEmpleado: emp.fechaNacEmpleado,
          direccionEmpleado: emp.direccionEmpleado,
          cargoEmpleado: emp.cargoEmpleado,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEdit(editLink);
  }, [editLink]);

  return (
    <section className="section main-sect">
      <h1 className="section-title" style={{ color: "green" }}>
        Edicion Empleado
      </h1>

      <div className="res-formContainer">
        <div className="emp-addEmpHiddenForm" id="empForm">
          <form className="emp-addEmpForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="res-formCenter">
              <div className="res-formSection">
                <div className="res-formTitle">
                  <h3>Edicion Empleado</h3>
                  <p>Editar los datos del empleado.</p>
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
                      placeholder={transformarFecha(data.fechaNacEmpleado)}
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
                  Editar
                </button>
                <button
                  type="button"
                  className="formBtn cancelBtn"
                  onClick={() => {
                    history.push("/empleados");
                  }}
                >
                  Anular
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EdicionEmpleado;
