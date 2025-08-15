export function normalizarProduccion(produccion) {
  // Función de ayuda para formatear la fecha a 'YYYY-MM-DD'
  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 10) : "";

  // Accedemos a los datos anidados de forma segura
  const pallet = produccion.pallets?.[0] || {};
  const empaque = pallet.empaque?.[0] || {};
  const tipoEmpaque = empaque.tipoEmpaques?.[0]?.tipo;
  const etiqueta = produccion.etiqueta || {};

  return {
    ...produccion,
    etiquetaNumero: etiqueta.id,

    // Datos del Pallet
    palletNumero: pallet.numeropallet,
    palletCantidad: pallet.cantidad,
    palletPeso: pallet.peso,

    // Datos del Empaque (con la fecha formateada)
    empaqueFecha: formatDate(empaque.fecha),
    empaquePeso: empaque.peso,
    empaqueTipo: tipoEmpaque,

    // Formateamos también la fecha principal de la producción
    fecha: formatDate(produccion.fecha),
  };
}
/**
 * Prepara los datos del formulario de Producción para ser enviados al backend.
 */
export function prepararProduccionParaSubmit(formData) {
  const datosParaEnviar = {
    fecha: formData.fecha,
    estado: formData.estado,
    etiqueta: { id: formData.etiquetaNumero },
    pallet: {
      numero: formData.palletNumero,
      cantidad: formData.palletCantidad,
      peso: formData.palletPeso,
    },
    empaque: {
      fecha: formData.empaqueFecha,
      peso: formData.empaquePeso,
      tipo: formData.empaqueTipo,
    },
  };

  // Si no es una edición, asignamos valores por defecto
  if (!formData.id) {
    datosParaEnviar.fecha = new Date().toISOString().split("T")[0];
    datosParaEnviar.estado = "No confirmado";
  }

  return datosParaEnviar;
}
