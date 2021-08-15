import React from "react";

const Habitaciones = () => {
  return (
    <div className="section main-sect">
      {/* Welcome Section */}
      <div className="hab-welcomeSect">
        <h1>
          Bienvenido: <span> Usuario </span>
        </h1>
      </div>
      <div class="section-title-underline"></div>
      {/* Title */}
      <h1 className="section-title">Habitaciones</h1>

      {/* Cards */}
      <div className="hab-cardsContainer">
        <article class="hab-cardContainer">
          <div class="hab-cardLeft">
            <img src="assets/Images/singleRoom.jpeg" alt="Habitacion" />
          </div>
          <div class="hab-cardRight">
            <div class="hab-cardRightCenter">
              <div class="hab-cardRight-title">
                <p>#001</p>
                <h3>Habitacion Simple</h3>
                <h6>Piso: 01</h6>
              </div>
              <div class="hab-cardRight-info">
                <p>Tipo: Single Room</p>
                <span>$150 / Noche</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Habitaciones;
