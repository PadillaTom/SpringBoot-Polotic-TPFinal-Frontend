import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  confirmacionReservaEndpoint,
  confirmacionReservaEndpointLocal,
} from "../Utils/constants";

const ConfirmacionReserva = () => {
  const [resData, setResData] = useState({});
  const [huesData, setHuesData] = useState(null);
  const [usuData, setUsuData] = useState({});
  const [habData, setHabData] = useState({});

  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [fecha3, setFecha3] = useState("");

  useEffect(() => {
    let isUnmounted = false;
    const fetchLastReserva = async (url) => {
      await axios
        .get(url)
        .then((res) => {
          if (!isUnmounted) {
            setResData(res.data);
            const resIn = new Date(res.data.fechaDe);
            const dia = resIn.getDate();
            const mes = resIn.getMonth() + 1;
            const anio = resIn.getFullYear();
            const resInStr = dia + "/" + mes + "/" + anio;
            setFecha1(resInStr);
            const resOut = new Date(res.data.fechaHasta);
            const dia1 = resOut.getDate();
            const mes1 = resOut.getMonth() + 1;
            const anio1 = resOut.getFullYear();
            const resOutStr = dia1 + "/" + mes1 + "/" + anio1;
            setFecha2(resOutStr);
            const huesNac = new Date(res.data.resHuesped.fechaNacHuesped);
            const dia2 = huesNac.getDate();
            const mes2 = huesNac.getMonth() + 1;
            const anio2 = huesNac.getFullYear();
            const huesStr = dia2 + "/" + mes2 + "/" + anio2;
            setFecha3(huesStr);
            setHuesData(res.data.resHuesped);
            setUsuData(res.data.resUsuario);
            setHabData(res.data.resHabitacion);
          }
        })
        .catch((err) => {
          if (!isUnmounted) {
            console.log(err);
          }
        });
      return () => {
        isUnmounted = true;
      };
    };
    fetchLastReserva(confirmacionReservaEndpointLocal);
  }, []);
  // console.log(resData, huesData, habData, usuData);

  return (
    <div>
      <section className="section main-sect">
        <h1 className="section-title" style={{ color: "green" }}>
          Reserva cargada con exito!
        </h1>
        <div className="res-formContainer">
          <form>
            <div className="res-formCenter">
              <div className="res-formSection">
                <div className="res-formTitle">
                  <h3>Reserva</h3>
                  <p>Habitacion, Cantidad de Personas y Fechas.</p>
                </div>
                <div className="res-formInputsContainer res-confirmacionInputsContainer">
                  <div className="res-confSingleInput">
                    <label>Habitacion:</label>
                    <span>
                      {habData?.nombreHabitacion}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Cant. Personas:</label>
                    <span>
                      {resData?.cantidadPersonas}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Check-In:</label>
                    <span>
                      {fecha1}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Check-Out:</label>
                    <span>
                      {fecha2}
                      {/* asd */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="res-formSection">
                <div className="res-formTitle">
                  <h3>Huesped</h3>
                  <p>Datos Personales del Huesped.</p>
                </div>
                <div className="res-formInputsContainer res-confirmacionInputsContainer">
                  <div className="res-confSingleInput">
                    <label>DNI:</label>
                    <span>
                      {huesData?.dniHuesped}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Nombre</label>
                    <span>
                      {huesData?.nombreHuesped}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Apellido</label>
                    <span>
                      {huesData?.apellidoHuesped}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Fecha Nac:</label>
                    <span>
                      {fecha3}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Direccion:</label>
                    <span>
                      {huesData?.direccionHuesped}
                      {/* asd */}
                    </span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Profesion:</label>
                    <span>
                      {huesData?.profesionHuesped}
                      {/* asd */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="res-formSection">
                <div className="res-formTitle">
                  <h3>Precio</h3>
                  <p>Cantidad de Noches y Precio Total.</p>
                </div>
                <div className="res-formInputsContainer res-confirmacionInputsContainer">
                  <div className="res-confSingleInput">
                    <label>Total Noches:</label>
                    <span>{resData?.cantidadNoches} Noches</span>
                  </div>
                  <div className="res-confSingleInput">
                    <label>Precio Estadia:</label>
                    <span style={{ letterSpacing: "1px", color: "crimson" }}>
                      ${resData?.precioTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="res-formSection">
              <div className="res-formInputsContainer res-confirmacionInputsContainer">
                <div
                  className="res-confSingleInput"
                  style={{ justifyContent: "space-around", width: "50%" }}
                >
                  <label>Cargada Por: </label>
                  <span>
                    {usuData?.usuEmpleado?.nombreEmpleado}{" "}
                    {usuData?.usuEmpleado?.apellidoEmpleado}
                    {/* asd */}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ConfirmacionReserva;
