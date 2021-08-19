//***************************************************
// Transform Fecha
//***************************************************
export const transformarFecha = (fecha) => {
  const fechaDate = new Date(fecha);
  const dia = fechaDate.getDate();
  const mes = fechaDate.getMonth() + 1;
  const anio = fechaDate.getFullYear();
  const finalDate = dia + "/" + mes + "/" + anio;
  return finalDate;
};
//***************************************************
// AddEmpleados
//***************************************************

//***************************************************
// AddEmpleados
//***************************************************
