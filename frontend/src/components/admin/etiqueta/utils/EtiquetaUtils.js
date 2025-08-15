export function normalizarEtiqueta(etiqueta) {
  // Función de ayuda para formatear la fecha a 'YYYY-MM-DD'
  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 10) : "";

  return {
    ...etiqueta,

    productor: etiqueta.Productor?.clp,
    exportador: etiqueta.Exportador?.nombreEmpresa,
    producto: etiqueta.Producto?.nombre,
    variedad: etiqueta.Variedad?.nombre,

    // Se formatea la fecha para que el input la entienda
    fechaEmp: formatDate(etiqueta.fechaEmp),
  };
}

/**
 * Prepara los datos del formulario de Etiqueta para ser enviados al backend.
 */
export function prepararEtiquetaParaSubmit(formData) {
  return {
    productor: { clp: formData.productor },
    exportador: { nombreEmpresa: formData.exportador },
    producto: { nombre: formData.producto },
    variedad: { nombre: formData.variedad },
    calibre: formData.calibre,
    categoria: formData.categoria,
    trazabilidad: formData.trazabilidad,
    destino: formData.destino,
    fechaEmp: formData.fechaEmp,
    estado: formData.estado || "No Confirmado",
  };
}
