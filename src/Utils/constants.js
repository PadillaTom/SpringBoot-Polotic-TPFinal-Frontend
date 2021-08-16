import {
  singleRoom,
  doubleRoom,
  tripleRoom,
  multipleRoom,
} from "../Assets/Images";

/* ======================================================================== */
/* API Endpoints */
/* ======================================================================== */
// Local:
export const usuariosEndpointLocal = "http://localhost:8080/api/usuarios";

// Heroku:
export const usuariosEndpoint =
  "https://polotic-tpfinal.herokuapp.com/api/usuarios";

/* ======================================================================== */
/* Nav Links */
/* ======================================================================== */
export const navLinks = [
  {
    id: 1,
    name: "Habitaciones",
    url: "/habitaciones",
  },
  {
    id: 2,
    name: "Reservas",
    url: "/reservas",
  },
  {
    id: 3,
    name: "Consultas",
    url: "/consultas",
  },
  {
    id: 4,
    name: "Empleados",
    url: "/empleados",
  },
  {
    id: 5,
    name: "Utiles",
    url: "/utiles",
  },
];
/* ======================================================================== */
/* Habitaciones Display */
/* ======================================================================== */
export const myHabitaciones = [
  {
    habitacionId: 1,
    pisoHabitacion: 1,
    nombreHabitacion: "Habitacion Simple",
    tipoHabitacion: "Single Room",
    precioNocheHabitacion: 150,
    imageUrl: singleRoom,
  },
  {
    habitacionId: 2,
    pisoHabitacion: 2,
    nombreHabitacion: "Habitacion Doble",
    tipoHabitacion: "Double Room",
    precioNocheHabitacion: 250,
    imageUrl: doubleRoom,
  },
  {
    habitacionId: 3,
    pisoHabitacion: 2,
    nombreHabitacion: "Habitacion Triple",
    tipoHabitacion: "Triple Room",
    precioNocheHabitacion: 300,
    imageUrl: tripleRoom,
  },
  {
    habitacionId: 4,
    pisoHabitacion: 3,
    nombreHabitacion: "Habitacion Multiple",
    tipoHabitacion: "Multiple Room",
    precioNocheHabitacion: 450,
    imageUrl: multipleRoom,
  },
];
