/* eslint-disable no-extend-native */
import React, { useState } from "react";
import axios from "axios";
import MCDatepicker from "mc-datepicker";

import {
  consultaPorDniEndpoint,
  consultaPorFechaEndpoint,
} from "../Utils/constants";
import { transformarFecha } from "../Utils/helpers";

const Consultas = () => {
  const [isActive, setIsActive] = useState("listaHues");
  const [isDisabled, setIsDisabled] = useState(true);
  const [picker2MinDate, setPicker2MinDate] = useState();
  const [showResponse, setShowResponse] = useState("");
  const [noResults, setNoResults] = useState("");

  const [fechaRes, setFechaRes] = useState();
  const [empRes, setEmpRes] = useState();
  const [huesRes, setHuesRes] = useState();
  const [huesDateRes, setHuesDateRes] = useState();

  const [empForm, setEmpForm] = useState({ dniEmpleado: "" });
  const [fechaForm, setFechaForm] = useState({
    fechaDeCarga: "",
  });
  const [porHyF, setPorHyF] = useState({
    fechaDe: "",
    fechaHasta: "",
    dniHuesped: "",
  });

  const handleActive = (e) => {
    setIsActive(e.target.id);
    setShowResponse(false);
  };

  // :::Consulta Por Fecha:::
  const picker1 = MCDatepicker.create({
    el: "#fechaDeCarga",
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
  // Fecha De:
  const picker2 = MCDatepicker.create({
    el: "#fechaDe",
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

  picker2.onSelect((date) => {
    setIsDisabled(false);
    // Settear Min Date:
    var myMin = date;
    myMin.setDate(date.getDate() + 1);
    setPicker2MinDate(myMin);
  });
  // Date Picker HASTA:
  let picker3 = MCDatepicker.create({
    el: "#fechaHasta",
    minDate: new Date(picker2MinDate),
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
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
    customClearBTN: "Borrar",
    customCancelBTN: "Anular",
  });

  // ::::::::::::::::::
  //  1. Requests
  // ::::::::::::::::::
  Date.prototype.addHours = function (hour) {
    this.setTime(this.getTime() + hour * 60 * 60 * 1000);
    return this;
  };

  const fechaReq = () => {
    const fechaDate = new Date(fechaForm.fechaDeCarga);
    fechaDate.addHours(7);
    const newRes = {
      fechaDeCarga: fechaDate,
    };
    axios
      .post(consultaPorFechaEndpoint, newRes)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setFechaRes(res.data);
          setShowResponse("displayFechaRes");
        } else {
          setNoResults("noFechaRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const empReq = (e) => {
    axios
      .post(consultaPorDniEndpoint, empForm)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setEmpRes(res.data);
          setShowResponse("displayResEmp");
        } else {
          setNoResults("noEmpRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const huesReq = () => {
    axios
      .get(consultaPorDniEndpoint)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setHuesRes(res.data);
          setShowResponse("displayHues");
        } else {
          setNoResults("noHuesRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const huesDateReq = () => {
    const fecha1 = new Date(porHyF.fechaDe);
    const fecha2 = new Date(porHyF.fechaHasta);
    fecha1.addHours(7);
    fecha2.addHours(7);
    const newRes = {
      fechaDe: fecha1,
      fechaHasta: fecha2,
      resHuesped: {
        dniHuesped: porHyF.dniHuesped,
      },
    };
    axios
      .post(`${consultaPorFechaEndpoint}/porHyF`, newRes)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setHuesDateRes(res.data);
          setShowResponse("displayPorHyF");
        } else {
          setNoResults("noHyFRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ::::::::::::::::::
  //  2. Form Data
  // ::::::::::::::::::
  const handleEmp = (e) => {
    const newData = { ...empForm };
    newData[e.target.id] = e.target.value;
    setEmpForm(newData);
  };
  const handleFecha = (e) => {
    const newData = { ...fechaForm };
    newData[e.target.id] = e.target.value;
    setFechaForm(newData);
  };
  const handleHyF = (e) => {
    const newData = { ...porHyF };
    newData[e.target.id] = e.target.value;
    setPorHyF(newData);
  };

  return (
    <section className="section main-sect">
      <h1 className="section-title">Consultas</h1>

      {/* <!--*** Menu ***--> */}
      <div className="cons-filterMenu">
        <ul>
          <li
            id="listaHues"
            className={isActive === "listaHues" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Lista Huespedes
          </li>
          <li
            id="porFecha"
            className={isActive === "porFecha" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Res. por Fecha
          </li>
          <li
            id="porEmp"
            className={isActive === "porEmp" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Res. por Empleado
          </li>
          <li
            id="porHyF"
            className={isActive === "porHyF" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Res. por Huesped y Fechas
          </li>
        </ul>
      </div>

      {/* 
        <!--************************-->
        <!--******* POR FECHA *******-->
        <!--************************--> 
        */}
      <div
        className="cons-singleScreen"
        id="screenResPorEmpleado"
        style={
          isActive === "porFecha" ? { display: "block" } : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Reservas Por Fecha</h1>
            <h3>
              Seleccionar una fecha para mostrar todas las Reservas cargadas
              dicho dia.
            </h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fechaReq();
              }}
            >
              <div className="res-factSingleInput">
                <label htmlFor="buscador">Fecha: </label>
                <input
                  id="fechaDeCarga"
                  type="text"
                  required
                  name="buscador"
                  placeholder="Calendario"
                  style={{ background: "none", textAlign: "center" }}
                  onFocus={() => {
                    picker1.open();
                  }}
                  onChange={(e) => handleFecha(e)}
                  value={picker1.onSelect((date, formatedDate) => {
                    fechaForm.fechaDeCarga = formatedDate;
                  })}
                />
              </div>
              <div className="login-formButtons">
                <input type="submit" className="formBtn" value="Buscar" />
              </div>
            </form>
          </div>
          {/* <!--*** Response ***--> */}
          <div
            className="emp-tableContainer singleScreen-resultsContainer"
            id="empContent"
          >
            {noResults === "noFechaRes" ? (
              <>
                <h3 className="buscador-notFound">
                  No se encuentran Reservas para la Fecha seleccionada.
                </h3>
              </>
            ) : (
              <></>
            )}
            {showResponse === "displayFechaRes" ? (
              <React.Fragment>
                <div className="section-title-underline"></div>
                <h2>Resultados</h2>
                <table style={{ marginBottom: "2rem" }}>
                  <thead>
                    <tr>
                      <th>N° Res </th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitacion</th>
                      <th>N° Huespedes</th>
                      <th>Huesped Dni</th>
                      <th>Huesped</th>
                      <th>Empleado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fechaRes?.map((r) => {
                      const {
                        reservaId,
                        fechaDe,
                        fechaHasta,
                        resHabitacion,
                        cantidadPersonas,
                        resHuesped,
                        resUsuario,
                      } = r;
                      const { dniHuesped, apellidoHuesped } = resHuesped;
                      return (
                        <tr key={reservaId}>
                          <td>{reservaId}</td>
                          <td>{transformarFecha(fechaDe)}</td>
                          <td>{transformarFecha(fechaHasta)}</td>
                          <td>{resHabitacion.tipoHabitacion}</td>
                          <td>{cantidadPersonas}</td>
                          <td>{dniHuesped}</td>
                          <td>{apellidoHuesped}</td>
                          <td>{resUsuario.usuEmpleado.nombreEmpleado}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
        </div>
      </div>

      {/* 
        <!--************************-->
        <!--***** POR EMPLEADO *****-->
        <!--************************--> 
        */}
      <div
        className="cons-singleScreen"
        id="screenResPorEmpleado"
        style={
          isActive === "porEmp" ? { display: "block" } : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Reservas Por Empleado</h1>
            <h3>Ingresar el DNI de un Empleado para obtener sus Reservas.</h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                empReq();
              }}
            >
              <div className="res-factSingleInput">
                <label htmlFor="buscador">DNI Empelado: </label>
                <input
                  type="text"
                  required
                  name="buscador"
                  style={{ background: "none", textAlign: "center" }}
                  id="dniEmpleado"
                  onChange={(e) => {
                    handleEmp(e);
                  }}
                />
              </div>
              <div className="login-formButtons">
                <input type="submit" className="formBtn" value="Buscar" />
              </div>
            </form>
          </div>
          {/* <!--*** Resposne ***--> */}
          <div
            className="emp-tableContainer singleScreen-resultsContainer"
            id="empContent"
          >
            {noResults === "noEmpRes" ? (
              <>
                <h3 className="buscador-notFound">
                  No se encuentran Reservas para el Empleado buscado.
                </h3>{" "}
              </>
            ) : (
              <></>
            )}
            {showResponse === "displayResEmp" ? (
              <React.Fragment>
                <div className="section-title-underline"></div>
                <h2>Resultados</h2>
                <table style={{ marginBottom: "2rem" }}>
                  <thead>
                    <tr>
                      <th>N° Res </th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitacion</th>
                      <th>N° Huespedes</th>
                      <th>Huesped Dni</th>
                      <th>Huesped</th>
                      <th>Empleado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empRes?.map((r) => {
                      const {
                        reservaId,
                        fechaDe,
                        fechaHasta,
                        resHabitacion,
                        cantidadPersonas,
                        resHuesped,
                        resUsuario,
                      } = r;
                      const { dniHuesped, apellidoHuesped } = resHuesped;
                      return (
                        <tr key={reservaId}>
                          <td>{reservaId}</td>
                          <td>{transformarFecha(fechaDe)}</td>
                          <td>{transformarFecha(fechaHasta)}</td>
                          <td>{resHabitacion.tipoHabitacion}</td>
                          <td>{cantidadPersonas}</td>
                          <td>{dniHuesped}</td>
                          <td>{apellidoHuesped}</td>
                          <td>{resUsuario.usuEmpleado.nombreEmpleado}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
        </div>
      </div>

      {/* 
      <!--*************************-->
      <!--**** LISTA HUESPEDES ****-->
      <!--*************************--> 
          */}
      <div
        className="cons-singleScreen"
        id="screenListaHuespedes"
        style={
          isActive === "listaHues" ? { display: "block" } : { display: "none" }
        }
      >
        <div className="cons-mainScreenContainer" style={{ paddinBottom: "0" }}>
          <div className="singleScreen-description">
            <h1>Lista de Huespedes</h1>
            <h3>Lista de todos los huespedes ingresados en el sistema.</h3>
          </div>
          <div className="singleScreen-buscador">
            <form>
              <div className="login-formButtons">
                <input
                  type="submit"
                  className="formBtn"
                  value="Buscar"
                  onClick={(e) => {
                    e.preventDefault();
                    huesReq();
                  }}
                />
              </div>
            </form>
          </div>
          {/* <!--*** Response ***--> */}
          <div style={{ marginTop: "-5rem" }}>
            <div
              className="emp-tableContainer singleScreen-resultsContainer"
              id="huesContent"
            >
              {noResults === "noHuesRes" ? (
                <>
                  <h3 className="buscador-notFound">
                    No se encuentran Huespedes por el momento.
                  </h3>
                </>
              ) : (
                <></>
              )}
              {showResponse === "displayHues" ? (
                <React.Fragment>
                  <div className="section-title-underline"></div>
                  <h2>Resultados</h2>
                  <table style={{ marginBottom: "2rem" }}>
                    <thead>
                      <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha Nac</th>
                        <th>Direccion</th>
                        <th>Profesion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {huesRes?.map((h) => {
                        const {
                          huespedId,
                          nombreHuesped,
                          apellidoHuesped,
                          dniHuesped,
                          fechaNacHuesped,
                          direccionHuesped,
                          profesionHuesped,
                        } = h;
                        return (
                          <tr key={huespedId}>
                            <td>{dniHuesped} </td>
                            <td>{nombreHuesped}</td>
                            <td>{apellidoHuesped}</td>
                            <td>{transformarFecha(fechaNacHuesped)}</td>
                            <td>{direccionHuesped}</td>
                            <td>{profesionHuesped}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 
      <!--*************************-->
      <!--**** POR HUESy FECHA ****-->
      <!--*************************--> 
            */}
      <div
        className="cons-singleScreen"
        id="screenResPorHuesyFechas"
        style={
          isActive === "porHyF" ? { display: "block" } : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Reservas Por Huesped y Fechas</h1>
            <h3>Ingresar DNI de Huesped y el rango de Fechas deseadas.</h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                huesDateReq();
              }}
            >
              <div className="res-factSingleInput">
                <label htmlFor="buscador">DNI Huesped </label>
                <input
                  type="text"
                  required
                  name="hues-dni"
                  style={{ background: "none", textAlign: "center" }}
                  id="dniHuesped"
                  onChange={(e) => {
                    handleHyF(e);
                  }}
                />
              </div>
              <div style={{ margin: "1rem 0rem" }}>
                <div className="res-formTitle">
                  <h3>Fechas</h3>
                  <p>Ingresar fechas de Check-in y Check-out.</p>
                </div>
                <div
                  className="datePickerBtnsContainer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    id="fechaDe"
                    type="text"
                    className="datePickerBtn"
                    placeholder="De"
                    name="res-fechaDe"
                    required
                    style={{ margin: "0rem 0.7rem" }}
                    onFocus={() => {
                      picker2.open();
                    }}
                    onChange={(e) => handleHyF(e)}
                    value={picker2.onSelect((date, formatedDate) => {
                      porHyF.fechaDe = formatedDate;
                    })}
                  />
                  <input
                    id="fechaHasta"
                    type="text"
                    className="datePickerBtn"
                    placeholder="Hasta"
                    name="res-fechaHasta"
                    required
                    disabled={isDisabled ? true : false}
                    style={{ margin: "0rem 0.7rem" }}
                    onFocus={() => {
                      picker3.open();
                    }}
                    onChange={(e) => handleHyF(e)}
                    value={picker3.onSelect((date, formatedDate) => {
                      porHyF.fechaHasta = formatedDate;
                    })}
                  />
                </div>
              </div>
              <div className="login-formButtons">
                <input
                  type="submit"
                  className="formBtn"
                  value="Buscar"
                  onClick={() => {
                    huesDateReq();
                  }}
                />
              </div>
            </form>
          </div>
          {/* <!--*** Response ***--> */}
          <div style={{ marginTop: "5rem" }}>
            <div className="emp-tableContainer singleScreen-resultsContainer">
              {noResults === "noHyFRes" ? (
                <>
                  <h3 className="buscador-notFound">
                    No se encuentran Reservas para la Fecha seleccionada.
                  </h3>
                </>
              ) : (
                <></>
              )}
              {showResponse === "displayPorHyF" ? (
                <React.Fragment>
                  <div className="section-title-underline"></div>
                  <h2>Resultados</h2>
                  <table style={{ marginBottom: "2rem" }}>
                    <thead>
                      <tr>
                        <th>N° Res </th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Habitacion</th>
                        <th>N° Huespedes</th>
                        <th>Huesped Dni</th>
                        <th>Huesped</th>
                        <th>Empleado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {huesDateRes?.map((r) => {
                        const {
                          reservaId,
                          fechaDe,
                          fechaHasta,
                          resHabitacion,
                          cantidadPersonas,
                          resHuesped,
                          resUsuario,
                        } = r;
                        const { dniHuesped, apellidoHuesped } = resHuesped;
                        return (
                          <tr key={reservaId}>
                            <td>{reservaId}</td>
                            <td>{transformarFecha(fechaDe)}</td>
                            <td>{transformarFecha(fechaHasta)}</td>
                            <td>{resHabitacion.tipoHabitacion}</td>
                            <td>{cantidadPersonas}</td>
                            <td>{dniHuesped}</td>
                            <td>{apellidoHuesped}</td>
                            <td>{resUsuario.usuEmpleado.nombreEmpleado}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultas;
