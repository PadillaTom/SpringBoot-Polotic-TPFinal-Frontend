/* eslint-disable no-extend-native */
import React, { useState } from "react";
import MCDatepicker from "mc-datepicker";
import axios from "axios";

import {
  consultaPorFechaEndpoint,
  consultaPorFechaEndpointLocal,
} from "../Utils/constants";
import { transformarFecha } from "../Utils/helpers";

const Utiles = () => {
  const [isActive, setIsActive] = useState("porEmpFecha");
  const [showResponse, setShowResponse] = useState("");
  const [noResults, setNoResults] = useState("");

  const [empFecha, setEmpFecha] = useState({
    fechaDeCarga1: "",
    dniEmpleado: "",
  });
  const [ganDiarias, setGanDiarias] = useState({ fechaDeCarga2: "" });
  const [ganMensuales, setGanMensuales] = useState({ fechaDeCarga3: "" });

  const [empFechaRes, setEmpFechaRes] = useState();
  const [ganDiariasRes, setGanDiariasRes] = useState();
  const [ganMensualesRes, setGanMensualesRes] = useState();

  const handleActive = (e) => {
    setIsActive(e.target.id);
  };

  // :::Res Diarias Por Emp:::
  const picker1 = MCDatepicker.create({
    el: "#fechaDeCarga1",
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

  // :::Ganancias Diarias:::
  const picker2 = MCDatepicker.create({
    el: "#fechaDeCarga2",
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
  // :::Ganancias Mensuales:::
  const picker3 = MCDatepicker.create({
    el: "#fechaDeCarga3",
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

  // ::::::::::::::::::
  //  1. Form Data
  // ::::::::::::::::::
  const handleEmpFecha = (e) => {
    const newData = { ...empFecha };
    newData[e.target.id] = e.target.value;
    setEmpFecha(newData);
  };
  const handleDiarias = (e) => {
    const newData = { ...ganDiarias };
    newData[e.target.id] = e.target.value;
    setGanDiarias(newData);
  };
  const handleMensuales = (e) => {
    const newData = { ...ganMensuales };
    newData[e.target.id] = e.target.value;
    setGanMensuales(newData);
  };
  // ::::::::::::::::::
  //  2. Requests
  // ::::::::::::::::::
  Date.prototype.addHours = function (hour) {
    this.setTime(this.getTime() + hour * 60 * 60 * 1000);
    return this;
  };
  const empFechaReq = () => {
    const fechaDate = new Date(empFecha.fechaDeCarga1);
    const newRes = {
      fechaDeCarga: fechaDate,
      resUsuario: {
        usuEmpleado: {
          dniEmpleado: empFecha.dniEmpleado,
        },
      },
    };
    axios
      .post(`${consultaPorFechaEndpoint}/resDiariasEmpleado`, newRes)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setEmpFechaRes(res.data);
          setShowResponse("displayEmpFecha");
        } else {
          setNoResults("noEmpFechaRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ganDiariasReq = () => {
    const fechaDate = new Date(ganDiarias.fechaDeCarga2);
    fechaDate.addHours(7);
    const newRes = {
      fechaDeCarga: fechaDate,
    };
    axios
      .post(consultaPorFechaEndpoint, newRes)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setGanDiariasRes(res.data);
          setShowResponse("displayGanDiarias");
        } else {
          setNoResults("noGanDiariasRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ganMensualesReq = () => {
    const fechaDate = new Date(ganMensuales.fechaDeCarga3);
    fechaDate.addHours(7);
    const newRes = {
      fechaDeCarga: fechaDate,
    };
    axios
      .post(`${consultaPorFechaEndpoint}/ganMensuales`, newRes)
      .then((res) => {
        if (res.data.length > 0) {
          setNoResults("");
          setGanMensualesRes(res.data);
          setShowResponse("displayGanMensuales");
        } else {
          setNoResults("noGanMensualesRes");
          setShowResponse("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Calculos:
  const calculoGanancias = (array) => {
    const suma = array.reduce((sum, res) => {
      const sumaTotal = sum + res.precioTotal;
      return sumaTotal;
    }, 0);
    return suma;
  };

  return (
    <section className="section main-sect">
      <h1 className="section-title">Utiles</h1>

      {/* <!--*** Menu ***--> */}
      <div className="cons-filterMenu">
        <ul>
          <li
            id="porEmpFecha"
            className={isActive === "porEmpFecha" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Reservas Diarias por Empleado
          </li>
          <li
            id="ganDiarias"
            className={isActive === "ganDiarias" ? "link cons-active" : "link"}
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Ganancias Diarias
          </li>
          <li
            id="ganMensuales"
            className={
              isActive === "ganMensuales" ? "link cons-active" : "link"
            }
            onClick={(e) => {
              handleActive(e);
            }}
          >
            Ganancias Mensuales
          </li>
        </ul>
      </div>

      {/* 
      <!--************************-->
      <!--** RES DIARIAS POR EMP **-->
      <!--************************--> 
      */}
      <div
        className="cons-singleScreen"
        id="screenPorEmpleadoFecha"
        style={
          isActive === "porEmpFecha"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Reservas Diarias por Empleado</h1>
            <h3>Ingresar DNI de Empleado y el la Fecha deseada.</h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                empFechaReq();
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
                    handleEmpFecha(e);
                  }}
                />
              </div>
              <div className="res-factSingleInput">
                <label htmlFor="buscador">Fecha: </label>
                <input
                  id="fechaDeCarga1"
                  type="text"
                  required
                  name="buscador"
                  placeholder="Calendario"
                  style={{ background: "none", textAlign: "center" }}
                  onFocus={() => {
                    picker1.open();
                  }}
                  onChange={(e) => handleEmpFecha(e)}
                  value={picker1.onSelect((date, formatedDate) => {
                    empFecha.fechaDeCarga1 = formatedDate;
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
            {noResults === "noEmpFechaRes" ? (
              <>
                <h3 className="buscador-notFound">
                  No se encuentran Reservas para la Fecha seleccionada.
                </h3>
              </>
            ) : (
              <></>
            )}
            {showResponse === "displayEmpFecha" ? (
              <React.Fragment>
                <div className="section-title-underline"></div>
                <h2>Resultados</h2>
                <h2 style={{ color: "crimson", marginTop: "0rem" }}>
                  Empleado:{" "}
                  {empFechaRes[0].resUsuario.usuEmpleado.apellidoEmpleado}
                </h2>
                <h2 style={{ color: "crimson", marginTop: "0rem" }}>
                  Cantidad Res: {empFechaRes.length}
                </h2>
                <table style={{ marginBottom: "2rem" }}>
                  <thead>
                    <tr>
                      <th>N° Res </th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitacion</th>
                      <th>Huesped</th>
                      <th>Cantidad Noches</th>
                      <th>Dni Empleado</th>
                      <th>Empleado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empFechaRes?.map((r) => {
                      const {
                        reservaId,
                        fechaDe,
                        fechaHasta,
                        resHabitacion,
                        resHuesped,
                        cantidadNoches,
                        resUsuario,
                      } = r;
                      const { dniEmpleado, apellidoEmpleado } =
                        resUsuario.usuEmpleado;
                      const { apellidoHuesped } = resHuesped;
                      return (
                        <tr key={reservaId}>
                          <td>{reservaId}</td>
                          <td>{transformarFecha(fechaDe)}</td>
                          <td>{transformarFecha(fechaHasta)}</td>
                          <td>{resHabitacion.tipoHabitacion}</td>
                          <td>{apellidoHuesped}</td>
                          <td>{cantidadNoches}</td>
                          <td>{dniEmpleado}</td>
                          <td>{apellidoEmpleado}</td>
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
      <!--** GANANCIAS DIARIAS ***-->
      <!--************************--> 
      */}
      <div
        className="cons-singleScreen"
        id="screenGanDiarias"
        style={
          isActive === "ganDiarias" ? { display: "block" } : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Ganancias Diarias</h1>
            <h3>Seleccionar Fecha para ver un Resumen de ganancias.</h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ganDiariasReq();
              }}
            >
              <div className="res-factSingleInput">
                <label htmlFor="buscador">Fecha: </label>
                <input
                  id="fechaDeCarga2"
                  type="text"
                  required
                  name="buscador"
                  placeholder="Calendario"
                  style={{ background: "none", textAlign: "center" }}
                  onFocus={() => {
                    picker2.open();
                  }}
                  onChange={(e) => handleDiarias(e)}
                  value={picker2.onSelect((date, formatedDate) => {
                    ganDiarias.fechaDeCarga2 = formatedDate;
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
            {noResults === "noGanDiariasRes" ? (
              <>
                <h3 className="buscador-notFound">
                  No se encuentran Reservas para la Fecha seleccionada.
                </h3>
              </>
            ) : (
              <></>
            )}
            {showResponse === "displayGanDiarias" ? (
              <React.Fragment>
                <div className="section-title-underline"></div>
                <h2>Resultados</h2>
                <h2 style={{ color: "crimson", marginTop: "0rem" }}>
                  Ganancias: {calculoGanancias(ganDiariasRes)}.- CHF
                </h2>
                <table style={{ marginBottom: "2rem" }}>
                  <thead>
                    <tr>
                      <th>N° Res </th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitacion</th>
                      <th>Huesped</th>
                      <th>Cantidad Noches</th>
                      <th>Precio Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ganDiariasRes?.map((r) => {
                      const {
                        reservaId,
                        fechaDe,
                        fechaHasta,
                        resHabitacion,
                        cantidadNoches,
                        precioTotal,
                        resHuesped,
                      } = r;
                      const { apellidoHuesped } = resHuesped;
                      return (
                        <tr key={reservaId}>
                          <td>{reservaId}</td>
                          <td>{transformarFecha(fechaDe)}</td>
                          <td>{transformarFecha(fechaHasta)}</td>
                          <td>{resHabitacion.tipoHabitacion}</td>
                          <td>{apellidoHuesped}</td>
                          <td>{cantidadNoches}</td>
                          <td>{precioTotal}</td>
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
      <!--* GANANCIAS MENSUALES *-->
      <!--************************--> 
      */}
      <div
        className="cons-singleScreen"
        id="screenGanMensuales"
        style={
          isActive === "ganMensuales"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div
          className="cons-mainScreenContainer"
          style={{ paddingBottom: "0" }}
        >
          <div className="singleScreen-description">
            <h1>Ganancias Mensuales</h1>
            <h3>
              Seleccionar CUALQUIER fecha del Mes deseado ver un Resumen de
              ganancias.
              <br />
              <br />
              Ejemplo: 02-02-2020 Para ver ganancias de "Febrero 2020".
            </h3>
          </div>
          <div className="singleScreen-buscador">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ganMensualesReq();
              }}
            >
              <div className="res-factSingleInput">
                <label htmlFor="buscador">Fecha: </label>
                <input
                  id="fechaDeCarga3"
                  type="text"
                  required
                  name="buscador"
                  placeholder="Calendario"
                  style={{ background: "none", textAlign: "center" }}
                  onFocus={() => {
                    picker3.open();
                  }}
                  onChange={(e) => handleMensuales(e)}
                  value={picker3.onSelect((date, formatedDate) => {
                    ganMensuales.fechaDeCarga3 = formatedDate;
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
            {noResults === "noGanMensualesRes" ? (
              <>
                <h3 className="buscador-notFound">
                  No se encuentran Reservas para la Fecha seleccionada.
                </h3>
              </>
            ) : (
              <></>
            )}
            {showResponse === "displayGanMensuales" ? (
              <React.Fragment>
                <div className="section-title-underline"></div>
                <h2>Resultados</h2>
                <h2 style={{ color: "crimson", marginTop: "0rem" }}>
                  Ganancias: {calculoGanancias(ganMensualesRes)}.- CHF
                </h2>
                <table style={{ marginBottom: "2rem" }}>
                  <thead>
                    <tr>
                      <th>N° Res </th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitacion</th>
                      <th>Huesped</th>
                      <th>Cantidad Noches</th>
                      <th>Precio Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ganMensualesRes?.map((r) => {
                      const {
                        reservaId,
                        fechaDe,
                        fechaHasta,
                        resHabitacion,
                        cantidadNoches,
                        precioTotal,
                        resHuesped,
                      } = r;
                      const { apellidoHuesped } = resHuesped;
                      return (
                        <tr key={reservaId}>
                          <td>{reservaId}</td>
                          <td>{transformarFecha(fechaDe)}</td>
                          <td>{transformarFecha(fechaHasta)}</td>
                          <td>{resHabitacion.tipoHabitacion}</td>
                          <td>{apellidoHuesped}</td>
                          <td>{cantidadNoches}</td>
                          <td>{precioTotal}</td>
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
    </section>
  );
};

export default Utiles;
