import React, { useState, useEffect } from "react";
import MCDatepicker from "mc-datepicker";

// FUNCTIONS ONCHANGE Y ONCLICK

const Reservas = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [tipoHab, setTipoHab] = useState("placeH");
  const [picker2MinDate, setPicker2MinDate] = useState();
  const [data, setData] = useState({
    tipoHabitacion: "",
    cantidadPersonas: "",
    fechaDe: "",
    fechaHasta: "",
    dniHuesped: "",
    nombreHuesped: "",
    apellidoHuesped: "",
    fechaNacHuesped: "",
    direccionHuesped: "",
    profesionHuesped: "",
  });

  // Fecha De:
  const picker1 = MCDatepicker.create({
    el: "#fechaDe",
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

  picker1.onSelect((date) => {
    setIsDisabled(false);
    // Settear Min Date:
    var myMin = date;
    myMin.setDate(date.getDate() + 1);
    setPicker2MinDate(myMin);
  });

  // Date Picker HASTA:
  let picker2 = MCDatepicker.create({
    el: "#fechaHasta",
    minDate: new Date(picker2MinDate),
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

  //  Date Picker: Fecha Nacimiento Huesped
  const picker3 = MCDatepicker.create({
    el: "#fechaNacHuesped",
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

  // Functions: Cantidad Personas.
  const getHabitacion = (e) => {
    if (e.target.value === "placeH") {
      setTipoHab("placeH");
    } else if (e.target.value === "Single Room") {
      setTipoHab("Single Room");
    } else if (e.target.value === "Double Room") {
      setTipoHab("Double Room");
    } else if (e.target.value === "Triple Room") {
      setTipoHab("Triple Room");
    } else if (e.target.value === "Multiple Room") {
      setTipoHab("Multiple Room");
    }
  };

  useEffect(() => {
    let cantPers = document.getElementById("cantidadPersonas");
    let myTipo = document.getElementById("tipoHabitacion");
    if (tipoHab === "placeH") {
      cantPers.value = "placeH";
      myTipo.value = "placeH";
      cantPers.options[0].disabled = true;
      cantPers.options[1].hidden = true;
      cantPers.options[2].hidden = true;
      cantPers.options[3].hidden = true;
      cantPers.options[4].hidden = true;
      cantPers.options[5].hidden = true;
      cantPers.options[6].hidden = true;
    }
    if (tipoHab === "Single Room") {
      myTipo.options[0].disabled = true;
      cantPers.options[0].disabled = true;
      cantPers.options[1].hidden = false;
      cantPers.options[2].hidden = true;
      cantPers.options[3].hidden = true;
      cantPers.options[4].hidden = true;
      cantPers.options[5].hidden = true;
      cantPers.options[6].hidden = true;
    } else if (tipoHab === "Double Room") {
      myTipo.options[0].disabled = true;
      cantPers.options[1].hidden = false;
      cantPers.options[2].hidden = false;
      cantPers.options[3].hidden = true;
      cantPers.options[4].hidden = true;
      cantPers.options[5].hidden = true;
      cantPers.options[6].hidden = true;
    } else if (tipoHab === "Triple Room") {
      myTipo.options[0].disabled = true;
      cantPers.options[1].hidden = false;
      cantPers.options[2].hidden = false;
      cantPers.options[3].hidden = false;
      cantPers.options[4].hidden = true;
      cantPers.options[5].hidden = true;
      cantPers.options[6].hidden = true;
    } else if (tipoHab === "Multiple Room") {
      myTipo.options[0].disabled = true;
      cantPers.options[1].hidden = false;
      cantPers.options[2].hidden = false;
      cantPers.options[3].hidden = false;
      cantPers.options[4].hidden = false;
      cantPers.options[5].hidden = false;
      cantPers.options[6].hidden = false;
    }
  }, [tipoHab]);

  // Handle Anular Form:
  const handleAnular = () => {
    setTipoHab("placeH");
    picker1.reset();
    picker2.reset();
    picker3.reset();
    setIsDisabled(true);
    setData({
      dniHuesped: "",
      nombreHuesped: "",
      apellidoHuesped: "",
      direccionHuesped: "",
      profesionHuesped: "",
    });
  };
  // Handle Changes Form:
  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };
  // Handle Submit:
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="section main-sect">
      {/* Title */}
      <h1 className="section-title">Cargar Nuevas Reservas</h1>

      {/* Formulario */}
      <div className="res-formContainer">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          id="formToBeDeleted"
        >
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
                    <label htmlFor="res-tipoHabitacion">Habitacion</label>
                    <select
                      className="res-select"
                      name="res-tipoHabitacion"
                      required
                      id="tipoHabitacion"
                      onChange={(e) => {
                        getHabitacion(e);
                        handleChange(e);
                      }}
                      value={data.tipoHabitacion}
                    >
                      <option value="placeH">Seleccionar</option>
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
                      id="cantidadPersonas"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={data.cantidadPersonas}
                    >
                      <option value="placeH">Seleccionar</option>
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
                      type="text"
                      className="datePickerBtn"
                      placeholder="De"
                      name="res-fechaDe"
                      required
                      onClick={() => {
                        picker1.open();
                      }}
                      id="fechaDe"
                      onChange={(e) => handleChange(e)}
                      value={picker1.onSelect((date, formatedDate) => {
                        data.fechaDe = formatedDate;
                      })}
                    />
                    <input
                      type="text"
                      className="datePickerBtn"
                      placeholder="Hasta"
                      name="res-fechaHasta"
                      required
                      style={
                        isDisabled
                          ? { background: "lightgray", cursor: "default" }
                          : { background: "#96baec", cursor: "pointer" }
                      }
                      disabled={isDisabled ? true : false}
                      onClick={() => {
                        picker2.open();
                      }}
                      onFocus={() => {
                        picker2.open();
                      }}
                      id="fechaHasta"
                      onChange={(e) => handleChange(e)}
                      value={picker2.onSelect((date, formatedDate) => {
                        data.fechaHasta = formatedDate;
                      })}
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
                  <input
                    type="text"
                    name="hues-dni"
                    required
                    id="dniHuesped"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.dniHuesped}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-nombre">Nombre:</label>
                  <input
                    type="text"
                    name="hues-nombre"
                    required
                    id="nombreHuesped"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.nombreHuesped}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-apellido">Apellido:</label>
                  <input
                    type="text"
                    name="hues-apellido"
                    required
                    id="apellidoHuesped"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.apellidoHuesped}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-fechaNac">Fecha Nac:</label>
                  <input
                    type="text"
                    name="hues-fechaNac"
                    required
                    placeholder="Seleccionar Fecha"
                    onClick={() => {
                      picker3.open();
                    }}
                    onFocus={() => {
                      picker3.open();
                    }}
                    id="fechaNacHuesped"
                    onChange={(e) => handleChange(e)}
                    value={picker3.onSelect((date, formatedDate) => {
                      data.fechaNacHuesped = formatedDate;
                    })}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-direccion">Direccion:</label>
                  <input
                    type="text"
                    name="hues-direccion"
                    required
                    id="direccionHuesped"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.direccionHuesped}
                  />
                </div>
                <div className="res-factSingleInput">
                  <label htmlFor="hues-profesion">Profesion:</label>
                  <input
                    type="text"
                    name="hues-profesion"
                    required
                    id="profesionHuesped"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.profesionHuesped}
                  />
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
                onClick={() => {
                  handleAnular();
                }}
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
