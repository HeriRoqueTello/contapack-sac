/**
 * Utilidades para el manejo de lotes
 */

/**
 * Calcula el número de semana ISO para una fecha dada
 * @param {string} dateString - Fecha en formato string
 * @returns {number} - Número de semana ISO
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
 * Normaliza un registro de lote con sus relaciones
 * @param {Object} registro - Registro del lote
 * @param {Object} dynamicFields - Campos dinámicos disponibles
 * @returns {Object} - Registro normalizado
 */
export function normalizarRegistro(registro, dynamicFields) {
  console.log("Registro original:", registro);
  // Buscar relaciones desde el lote o desde los datos dinámicos
  const productor =
    registro.Productor ||
    dynamicFields.productores?.find(
      (p) => p.id === Number(registro.productorId)
    ) ||
    {};

  const exportador =
    registro.Exportador ||
    dynamicFields.exportadores?.find(
      (e) => e.id === Number(registro.exportadorId)
    ) ||
    {};

  const responsable =
    registro.Responsable ||
    dynamicFields.responsables?.find(
      (r) => r.id === Number(registro.responsableId)
    ) ||
    {};

  // Buscar guía del productor
  const guia =
    dynamicFields.productor?.guias?.[0]?.guiaProductor.find(
      (g) => g.productorId === Number(productor.id)
    ) || {};

  // Buscar transporte del lote
  const transporte =
    dynamicFields.transporteDescarga?.find(
      (t) => t.registroMateriaPrimaId === registro.id
    ) || {};

  console.log("registros: ", registro);

  return {
    ...registro,
    // IDs normalizados
    productorId: registro.productorId ?? productor.id ?? null,
    exportadorId: registro.exportadorId ?? exportador.id ?? null,
    responsableId:
      registro.responsableId ??
      registro.Productor?.responsables?.[0]?.id ??
      responsable.id ??
      null,
    transporteDescargaId: transporte.id ?? null,

    // Campos derivados - preservar valores existentes si están disponibles
    clp: registro.clp ?? productor.clp ?? "",
    lugReferencia:
      registro.lugReferencia ?? productor.lugReferencia ?? "Sin Referencia",
    codigo: productor.codigo ?? "Sin Codigo",
    guiaProductor: registro.guiaProductor ?? guia.guiaProductor ?? "Sin Guía",
    pesoGuia: registro.pesoGuia ?? guia.pesoGuia ?? 0.0,
    responsable:
      registro.responsable ?? responsable.nombre ?? "Sin Responsable lote",

    // Campos del transporte (solo si decides duplicarlos)
    placa: registro.placaTransporte ?? transporte.placa ?? "Sin Placa",
    placa2: registro.placa2Transporte ?? transporte.placa2 ?? "Sin Placa",
    empTransportes: transporte.id ?? "Sin Empresa",
    guiaTransportista:
      registro.guiaTransportista ??
      transporte.guiaTransportista ??
      "Sin Guía Transportista",
    chofer: transporte.chofer?.id ?? "Sin chofer",
    licConducir: transporte.chofer?.licencia ?? "Sin licencia",
  };
}

/**
 * Valida que un registro tenga los IDs necesarios para editar
 * @param {Object} registro - Registro a validar
 * @returns {boolean} - true si es válido, false en caso contrario
 */
export function validarRegistroParaEditar(registro) {
  return !!(
    registro.productorId &&
    registro.exportadorId &&
    registro.responsableId
  );
}

/**
 * Calcula la diferencia de peso entre guía y peso neto
 * @param {number} pesoGuia - Peso de la guía
 * @param {number} pesoNeto - Peso neto
 * @returns {string} - Diferencia formateada con 2 decimales
 */
export function calcularDiferenciaPeso(pesoGuia, pesoNeto) {
  return (Number(pesoGuia) - Number(pesoNeto)).toFixed(2);
}

/**
 * Construye el código único del lote
 * @param {Object} productor - Datos del productor
 * @param {Object} exportador - Datos del exportador
 * @param {string} numIngreso - Número de ingreso
 * @returns {Object} - Objeto con código y codNumero
 */
export function construirCodigoLote(productor, exportador, numIngreso) {
  const codigoProductor = productor.codigo ?? "";
  const codigoExportador = exportador.codigo ?? "";
  const codigo = `${codigoProductor}${codigoExportador}`;
  const codNumero = `${codigo}-${numIngreso}`;

  return { codigo, codNumero };
}
