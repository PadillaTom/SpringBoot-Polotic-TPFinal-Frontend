import React, { useEffect } from "react";
import MCDatepicker from "mc-datepicker";

// PASAR STATES PARA DISABLE HASTABTN
// FUNCTIONS ONCHANGE Y ONCLICK

const Reservas = () => {
  // Disable HASTA, hasta seleccionar DE.
  // const hastaBtn = document.getElementById("datepickerHasta");
  // console.log(hastaBtn);
  // hastaBtn.disabled = true;
  // hastaBtn.style.background = "lightgray";
  // hastaBtn.style.cursor = "default";
  // Fecha De:
  const picker1 = MCDatepicker.create({
    el: "#datepickerDe",
    dateFormat: "dd-mm-yyyy",
    minDate: new Date(),
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
  let picker2 = document.getElementById("#datepickerHasta");
  picker1.onSelect((date) => {
    // Habilitar HASTA:
    // hastaBtn.disabled = false;
    // hastaBtn.style.background = "#96baec"; // ColorBlue
    // hastaBtn.style.cursor = "pointer";

    // Settear Min Date:
    var myMin = new Date(date);
    myMin.setDate(date.getDate() + 1);

    // Date Picker HASTA:
    picker2 = MCDatepicker.create({
      el: "#datepickerHasta",
      minDate: myMin,
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
        "Sep.",
        "Oct.",
        "Nov.",
        "Dic.",
      ],
      customClearBTN: "Borrar",
      customCancelBTN: "Anular",
    });
  });
  //  Date Picker: Fecha Nacimiento Huesped
  const picker3 = MCDatepicker.create({
    el: "#datepickerFechaNac",
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

  return (
    <div className="section main-sect">
      {/* Title */}
      <h1 className="section-title">Cargar Nuevas Reservas</h1>

      {/* Formulario */}
      <div className="res-formContainer">
        <form action="">
          <div className="res-formCenter">
            {/* Reserva*/}
            <div className="res-formSection">
              <div className="res-formTitle">
                <h3>Habitacion</h3>
                <p>
                  Seleccionar el Tipo de Habitacion y Cantidad de Huespedes.
                </p>
              </div>
              <div className="res-formInputsContainer">
                <div className="res-formInputsTop">
                  <div className="res-singleInput">
                    <label htmlFor="res-tipoHabitacion">Habitacion </label>
                    <select
                      className="res-select"
                      name="res-tipoHabitacion"
                      id="res-habSelect"
                      onChange="getHabitacion();"
                      required
                    >
                      <option value="Single Room">Single Room</option>
                      <option value="Double Room">Double Room</option>
                      <option value="Triple Room">Triple Room</option>
                      <option value="Multiple Room">Multiple Room</option>
                    </select>
                  </div>
                  <div className="res-singleInput">
                    <label htmlFor="res-cantPersonas">
                      Cantidad de Personas{" "}
                    </label>
                    <select
                      className="res-select"
                      name="res-cantPersonas"
                      required
                      id="res-cantPers"
                    >
                      <option value="1" id="1per">
                        1
                      </option>
                      <option value="2" id="2per">
                        2
                      </option>
                      <option value="3" id="3per">
                        3
                      </option>
                      <option value="4" id="4per">
                        4
                      </option>
                      <option value="5" id="5per">
                        5
                      </option>
                      <option value="6" id="6per">
                        6
                      </option>
                    </select>
                  </div>
                </div>
                <div className="res-fechasContainer">
                  <div className="res-formTitle">
                    <h3>Fechas</h3>
                    <p>Ingresar fechas de Check-in y Check-out.</p>
                  </div>
                  <div className="datePickerBtnsContainer">
                    <input
                      id="datepickerDe"
                      type="text"
                      className="datePickerBtn"
                      placeholder="De"
                      name="res-fechaDe"
                      required
                      onClick={() => {
                        picker1.open();
                      }}
                    />
                    <input
                      id="datepickerHasta"
                      type="text"
                      className="datePickerBtn"
                      placeholder="Hasta"
                      name="res-fechaHasta"
                      required
                      onClick={() => {
                        picker2.open();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Huesped */}
            <div className="res-formSection">
              <div className="res-formTitle">
                <h3>Datos de Facturacion</h3>
                <p>Ingresar los datos proporcionados por el Huesped.</p>
              </div>
              <div className="res-formInputsContainer res-facturacionContainer">
                <div className="res-factSingleInput">
                  <label htmlFor="hues-dni">DNI:</label>
                  <input type="text" name="hues-dni" required />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-nombre">Nombre:</label>
                  <input type="text" name="hues-nombre" required />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-apellido">Apellido:</label>
                  <input type="text" name="hues-apellido" required />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-fechaNac">Fecha Nac:</label>
                  <input
                    type="text"
                    name="hues-fechaNac"
                    id="datepickerFechaNac"
                    required
                    placeholder="Seleccionar Fecha"
                    onClick={() => {
                      picker3.open();
                    }}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-direccion">Direccion:</label>
                  <input type="text" name="hues-direccion" required />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-profesion">Profesion:</label>
                  <input type="text" name="hues-profesion" required />
                </div>
              </div>
            </div>
            {/* Buttons  */}
            <div className="res-formBtnContainer">
              <input
                type="submit"
                value="Guardar"
                className="formBtn"
                name="cargarReserva"
              />
              <button
                type="button"
                className="formBtn cancelBtn"
                onClick="borrarCampos(); selectedToDefault();"
              >
                Anular
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservas;
