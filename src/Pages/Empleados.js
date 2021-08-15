import React from "react";

//  Crear STATES
//  onCLick , onChange,
//  Fechas

const Empleados = () => {
  return (
    <div className="section main-sect">
      <h1 className="section-title">Empleados</h1>
      <div class="emp-mainCenter">
        <div class="section-title-underline"></div>

        {/* <!--*** Add Empleado ***--> */}
        <div class="emp-currentSession">
          <h1>
            Usuario Actual: <span> Usuario </span>
          </h1>
        </div>
        <div class="emp-addEmpContainer">
          <input
            type="submit"
            class="emp-addEmp formBtn"
            value="Nuevo Empleado"
            id="displayAddEmpForm"
            onclick="showForm();"
          />
        </div>

        {/* Hidden Form */}
        <div class="emp-addEmpHiddenForm" id="empForm">
          <form
            class="emp-addEmpForm"
            action="SvUsuario"
            method="POST"
            id="myEmpForm"
          >
            <div class="res-formCenter">
              <div class="res-formSection">
                <div class="res-formTitle">
                  <h3>Nuevo Empleado</h3>
                  <p>Ingresar los datos del nuevo empleado.</p>
                </div>
                <div class="res-formInputsContainer res-facturacionContainer">
                  <div class="res-factSingleInput">
                    <label for="empUsername">Usuario:</label>
                    <input type="text" name="empUsername" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empPassword">Contraseña:</label>
                    <input type="text" name="empPassword" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empDni">DNI:</label>
                    <input type="text" name="empDni" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empNombre">Nombre:</label>
                    <input type="text" name="empNombre" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empApellido">Apellido:</label>
                    <input type="text" name="empApellido" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empFechaNac">Fecha Nac:</label>
                    <input
                      type="text"
                      name="empFechaNac"
                      required="true"
                      id="datepickerEmpFechaNac"
                      placeholder="Seleccionar Fecha"
                    />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empDireccion">Direccion:</label>
                    <input type="text" name="empDireccion" required="true" />
                  </div>
                  <div class="res-factSingleInput">
                    <label for="empCargo">Cargo:</label>
                    <input type="text" name="empCargo" required="true" />
                  </div>
                </div>
              </div>
              <div class="emp-addEmpFormBtns">
                <input type="submit" value="Agregar" class="formBtn" />
                <button
                  type="button"
                  class="formBtn cancelBtn"
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
        <div class="emp-tableContainer">
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
              {/* Admin Emp */}
              <tr style={{ backgroundColor: "#DCE9F9" }}>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td>Admin</td>
                <td class="emp-tableIconsContainer">
                  <div>
                    <div></div>
                  </div>
                  <div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Empleados;
