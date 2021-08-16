import React from "react";

import { Error, Loading } from "../Components/Utils";
import { AddEmpleado } from "../Components/Forms/";

import { useUsuariosContext } from "../Context/usuarios_context";
import { useOpenFormsContext } from "../Context/openForms_context";

import { deleteEmpIcon, editEmpIcon } from "../Assets/Icons";

const Empleados = () => {
  const { addEmpIsOpen, openEmpForm } = useOpenFormsContext();
  const {
    usuarios,
    usuarioAdmin: admin,
    usuarios_loading,
    usuarios_error,
  } = useUsuariosContext();

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

        {addEmpIsOpen ? (
          <AddEmpleado></AddEmpleado>
        ) : (
          <div
            className={
              addEmpIsOpen ? "emp-addEmpContainerNone" : "emp-addEmpContainer"
            }
          >
            <input
              type="submit"
              className="emp-addEmp formBtn"
              value="Nuevo Empleado"
              id="displayAddEmpForm"
              onClick={() => {
                openEmpForm();
              }}
            />
          </div>
        )}

        {/* Table */}
        <div className="emp-tableContainer">
          {usuarios_loading ? (
            <Loading></Loading>
          ) : (
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
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {/* All Usuarios */}
                {usuarios.map((usu) => {
                  const { id, username, password } = usu;
                  return (
                    <tr key={id}>
                      <td>{username}</td>
                      <td>{password}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="emp-tableIconsContainer">
                        <img
                          src={editEmpIcon}
                          alt="Editar Empleado"
                          className="emp-tableIcon"
                        ></img>
                        <img
                          src={deleteEmpIcon}
                          alt="Borrar Empleado"
                          className="emp-tableIcon"
                        ></img>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Empleados;
