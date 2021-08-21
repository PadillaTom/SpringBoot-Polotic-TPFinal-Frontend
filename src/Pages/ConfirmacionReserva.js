import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  confirmacionReservaEndpoint,
  confirmacionReservaEndpointLocal,
} from "../Utils/constants";

import { transformarFecha } from "../Utils/helpers";

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
            setFecha1(transformarFecha(res.data.fechaDe));
            setFecha2(transformarFecha(res.data.fechaHasta));
            setFecha3(transformarFecha(res.data.resHuesped.fechaNacHuesped));
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
    fetchLastReserva(confirmacionReservaEndpoint);
  }, []);

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
