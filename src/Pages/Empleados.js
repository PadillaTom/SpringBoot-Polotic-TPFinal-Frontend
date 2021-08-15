import React from "react";
import MCDatepicker from "mc-datepicker";

import { useUsuariosContext } from "../Context/usuarios_context";

import { Error, Loading } from "../Components/Utils";

// Date Picker: Fecha Nac Empleado.
const picker = MCDatepicker.create({
  el: "#datepickerEmpFechaNac",
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

//  Crear STATES
//  onCLick , onChange,
//  Fechas
//  Date Picker: Empleado Fecha Nacimiento:

const Empleados = () => {
  const {
    usuarios,
    usuarioAdmin: admin,
    usuarios_loading,
    usuarios_error,
  } = useUsuariosContext();

  if (usuarios_loading) {
    return <Loading></Loading>;
  }
  if (usuarios_error) {
    return <Error></Error>;
  }

  return (
    <div className="section main-sect">
      <h1 className="section-title">Empleados</h1>
      <div className="emp-mainCenter">
        <div className="section-title-underline"></div>

        {/* <!--*** Add Empleado ***--> */}
        <div className="emp-currentSession">
          <h1>
            Usuario Actual: <span> Usuario </span>
          </h1>
        </div>
        <div className="emp-addEmpContainer">
          <input
            type="submit"
            className="emp-addEmp formBtn"
            value="Nuevo Empleado"
            id="displayAddEmpForm"
            onclick="showForm();"
          />
        </div>

        {/* Hidden Form */}
        <div className="emp-addEmpHiddenForm" id="empForm">
          <form
            className="emp-addEmpForm"
            action="SvUsuario"
            method="POST"
            id="myEmpForm"
          >
            <div className="res-formCenter">
              <div className="res-formSection">
                <div className="res-formTitle">
                  <h3>Nuevo Empleado</h3>
                  <p>Ingresar los datos del nuevo empleado.</p>
                </div>
                <div className="res-formInputsContainer res-facturacionContainer">
                  <div className="res-factSingleInput">
                    <label htmlFor="empUsername">Usuario:</label>
                    <input type="text" name="empUsername" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empPassword">Contraseña:</label>
                    <input type="text" name="empPassword" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empDni">DNI:</label>
                    <input type="text" name="empDni" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empNombre">Nombre:</label>
                    <input type="text" name="empNombre" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empApellido">Apellido:</label>
                    <input type="text" name="empApellido" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empFechaNac">Fecha Nac:</label>
                    <input
                      type="text"
                      name="empFechaNac"
                      required
                      id="datepickerEmpFechaNac"
                      placeholder="Seleccionar Fecha"
                      onClick={() => {
                        picker.open();
                      }}
                    />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empDireccion">Direccion:</label>
                    <input type="text" name="empDireccion" required />
                  </div>
                  <div className="res-factSingleInput">
                    <label htmlFor="empCargo">Cargo:</label>
                    <input type="text" name="empCargo" required />
                  </div>
                </div>
              </div>
              <div className="emp-addEmpFormBtns">
                <input type="submit" value="Agregar" className="formBtn" />
                <button
                  type="button"
                  className="formBtn cancelBtn"
                  onclick="hideForm(); borrarCampos();"
                >
                  Anular
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* End Hidden Form */}

        {/* Table */}
        <div className="emp-tableContainer">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nac.</th>
                <th>Direccion</th>
                <th>Cargo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Admin Usuario */}
              <tr style={{ backgroundColor: "#DCE9F9" }}>
                <td>{admin[0]?.username}</td>
                <td>{admin[0]?.password}</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td></td>
              </tr>
              {/* All Usuarios */}
              {usuarios.map((usu) => {
                const { id, username, password } = usu;
                return (
                  <tr key={id}>
                    <td>{username}</td>
                    <td>{password}</td>
                    <td>Admin</td>
                    <td>Admin</td>
                    <td>Admin</td>
                    <td>Admin</td>
                    <td>Admin</td>
                    <td>Admin</td>
                    <td className="emp-tableIconsContainer">
                      <div>a</div>
                      <div>b</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Empleados;
