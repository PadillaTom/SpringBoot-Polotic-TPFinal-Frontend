import React from "react";

import { Error, Loading } from "../Components/Utils";
import { AddEmpleado } from "../Components/Forms/";

import { useUsuariosContext } from "../Context/usuarios_context";
import { useOpenFormsContext } from "../Context/openForms_context";

import { deleteEmpIcon, editEmpIcon } from "../Assets/Icons";

import { transformarFecha } from "../Utils/helpers";

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
                {admin.map((adm) => {
                  const { usuarioId, username, password, usuEmpleado } = adm;
                  return (
                    <tr style={{ backgroundColor: "#DCE9F9" }} key={usuarioId}>
                      <td>{username}</td>
                      <td>{password}</td>
                      <td>{adm.usuEmpleado.dniEmpleado}</td>
                      <td>{adm.usuEmpleado.nombreEmpleado}</td>
                      <td>{adm.usuEmpleado.apellidoEmpleado}</td>
                      <td>{transformarFecha(usuEmpleado.fechaNacEmpleado)}</td>
                      <td>{adm.usuEmpleado.direccionEmpleado}</td>
                      <td>{adm.usuEmpleado.cargoEmpleado}</td>
                      <td></td>
                    </tr>
                  );
                })}

                {/* All Usuarios */}
                {usuarios.map((usu) => {
                  const { usuarioId, username, password, usuEmpleado } = usu;
                  return (
                    <tr key={usuarioId}>
                      <td>{username}</td>
                      <td>{password}</td>
                      <td>{usuEmpleado.dniEmpleado}</td>
                      <td>{usuEmpleado.nombreEmpleado}</td>
                      <td>{usuEmpleado.apellidoEmpleado}</td>
                      <td>{transformarFecha(usuEmpleado.fechaNacEmpleado)}</td>
                      <td>{usuEmpleado.direccionEmpleado}</td>
                      <td>{usuEmpleado.cargoEmpleado}</td>
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
