export function normalizarEtiqueta(etiqueta) {
  return {
    ...etiqueta,

    productor: etiqueta.Productor?.clp,
    exportador: etiqueta.Exportador?.nombreEmpresa,
    producto: etiqueta.Producto?.nombre,
    variedad: etiqueta.Variedad?.nombre,

    fechaEmp: etiqueta.fechaEmp,
  };
}