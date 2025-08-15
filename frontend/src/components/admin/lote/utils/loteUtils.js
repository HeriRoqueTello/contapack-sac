/**
 * Utilidades para el manejo de lotes
 */

export function getISOWeekNumber(dateString) {
  const date = new Date(dateString);
  const dayNr = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNr + 3);
  const firstThursday = new Date(date.getFullYear(), 0, 4);
  const diff = date - firstThursday;
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Prepara el objeto de lote para ser enviado al backend.
 */
export function prepararLoteParaSubmit(formData, dynamicFields) {
  let productorSeleccionado;
  if (!isNaN(Number(formData.productorId))) {
    productorSeleccionado = dynamicFields.productores?.find(
      (p) => p.id === Number(formData.productorId)
    );
  } else {
    productorSeleccionado = {
      nombre: formData.productorId,
      clp: formData.clp,
      lugReferencia: formData.lugReferencia,
    };
  }

  let exportadorSeleccionado;
  if (!isNaN(Number(formData.exportadorId))) {
    exportadorSeleccionado = dynamicFields.exportadores?.find(
      (e) => e.id === Number(formData.exportadorId)
    );
  } else {
    exportadorSeleccionado = { nombreEmpresa: formData.exportadorId };
  }

  let responsableSeleccionado;
  if (!isNaN(Number(formData.responsableId))) {
    const resp = dynamicFields.responsables?.find(
      (r) => r.id === Number(formData.responsableId)
    );
    responsableSeleccionado = { nombre: resp?.nombre };
  } else {
    responsableSeleccionado = { nombre: formData.responsableId };
  }

  let guiaProductorSeleccionada;
  if (!isNaN(Number(formData.guiaProductorId))) {
    const guia = dynamicFields.guiaProductor?.find(
      (g) => g.id === Number(formData.guiaProductorId)
    );
    guiaProductorSeleccionada = { guiaProductor: guia?.guiaProductor };
  } else {
    guiaProductorSeleccionada = { guiaProductor: formData.guiaProductorId };
  }
  guiaProductorSeleccionada.fechaGuia = formData.fechaGuia;
  guiaProductorSeleccionada.pesoGuia = formData.pesoGuia || 0;

  let choferSeleccionado;
  if (!isNaN(Number(formData.choferId))) {
    const chof = dynamicFields.choferes?.find(
      (c) => c.id === Number(formData.choferId)
    );
    choferSeleccionado = { nombre: chof?.nombre, licencia: chof?.licencia };
  } else {
    choferSeleccionado = {
      nombre: formData.choferId,
      licencia: formData.licencia,
    };
  }
  if (formData.licencia) {
    choferSeleccionado.licencia = formData.licencia;
  }

  if (!productorSeleccionado || !exportadorSeleccionado) {
    throw new Error("Productor o Exportador no válido.");
  }
  
  const loteFinal = { ...formData };
  loteFinal.numSemana = getISOWeekNumber(loteFinal.fecha);
  loteFinal.campaña = new Date(loteFinal.fecha).getFullYear();
  loteFinal.cantJabas = 0;
  loteFinal.pesoNeto = 0;
  const pesoGuiaNum = Number(formData.pesoGuia) || 0;
  // const pesoCalculado = (loteFinal.pesoNeto - loteFinal.pesoDescuento).toFixed(
  //   2
  // );
  // loteFinal.difPeso = (pesoGuiaNum - parseFloat(pesoCalculado)).toFixed(2);
  loteFinal.difPeso = (pesoGuiaNum - loteFinal.pesoNeto).toFixed(2)

  return {
    ...loteFinal,
    productor: productorSeleccionado,
    exportador: exportadorSeleccionado,
    responsable: responsableSeleccionado,
    guiaProductor: guiaProductorSeleccionada,
    transporteDescarga: {
      placa: formData.placa,
      placa2: formData.placa2,
      empresaTransporte: formData.empresaTransporte,
      guiaTransportista: formData.guiaTransportista,
    },
    chofer: choferSeleccionado,
  };
}

/**
 * Normaliza un registro de lote con todas sus relaciones para poder editarlo en el formulario.
 */
export function normalizarRegistroParaEditar(registro) {
  if (!registro) return null;

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 10) : "";
  const formatDateTime = (dateString) =>
    dateString ? new Date(dateString).toISOString().slice(0, 16) : "";

  const productor = registro.Productor;
  const exportador = registro.Exportador;
  const guia = productor?.guias?.[0];
  const responsable = productor?.responsables?.[0];
  const transporte = registro.transporteDescargas?.[0];
  const chofer = transporte?.choferes?.[0];

  const datosAplanados = {
    ...registro,
    productorId: productor?.id ?? null,
    exportadorId: exportador?.id ?? null,
    responsableId: responsable?.id ?? null,
    guiaProductorId: guia?.id ?? null,
    choferId: chofer?.id ?? null,
    fecha: formatDate(registro.fecha),
    horaDescarga: formatDateTime(registro.horaDescarga),
    fechaGuia: formatDate(guia?.fechaGuia),
    pesoGuia: guia?.pesoGuia,
    empresaTransporte: transporte?.empresaTransporte,
    guiaTransportista: transporte?.guiaTransportista,
    placa: transporte?.placa,
    placa2: transporte?.placa2,
    licencia: chofer?.licencia,
  };

  return datosAplanados;
}

export function validarRegistroParaEditar(registro) {
  return !!(
    registro.productorId &&
    registro.exportadorId &&
    registro.responsableId
  );
}
