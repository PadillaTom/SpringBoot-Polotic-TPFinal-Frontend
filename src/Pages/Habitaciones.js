import React from "react";

import { myHabitaciones } from "../Utils/constants";

const Habitaciones = () => {
  return (
    <div className="section main-sect">
      {/* Welcome Section */}
      <div className="hab-welcomeSect">
        <h1>
          Bienvenido: <span> AdminHotel </span>
        </h1>
      </div>
      <div className="section-title-underline"></div>

      {/* Title */}
      <h1 className="section-title">Habitaciones</h1>

      {/* Cards */}
      <div className="hab-cardsContainer">
        {myHabitaciones.map((hab) => {
          const {
            habitacionId,
            pisoHabitacion,
            nombreHabitacion,
            precioNocheHabitacion,
            tipoHabitacion,
            imageUrl,
          } = hab;
          return (
            <article className="hab-cardContainer" key={habitacionId}>
              <div className="hab-cardLeft">
                <img src={imageUrl} alt="Habitacion" />
              </div>
              <div className="hab-cardRight">
                <div className="hab-cardRightCenter">
                  <div className="hab-cardRight-title">
                    <p>#00{habitacionId}</p>
                    <h3>{nombreHabitacion}</h3>
                    <h6>Piso: 0{pisoHabitacion}</h6>
                  </div>
                  <div className="hab-cardRight-info">
                    <p>Tipo: {tipoHabitacion}</p>
                    <span>${precioNocheHabitacion} / Noche</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Habitaciones;
