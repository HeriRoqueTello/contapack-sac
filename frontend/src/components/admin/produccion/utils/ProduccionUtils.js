export function normalizarProduccion(produccion) {
  const pallet = produccion.pallets?.[0] || {};
  const empaque = pallet.empaque?.[0] || {};
  const tipoEmpaque = empaque.tipoEmpaques?.[0]?.tipo;

  return {
    ...produccion,

    // --- Propiedades para los campos del formulario ---
    productoNombre: produccion.Producto?.nombre,
    productoVariedad: produccion.Producto?.Variedad?.nombre,
    productoCalibre: produccion.Producto?.Calibre?.nombre,
    productoCategoria: produccion.Producto?.Categoria?.nombre,

    palletNumero: pallet.numeropallet,
    palletCantidad: pallet.cantidad,
    palletPeso: pallet.peso,

    empaqueFecha: empaque.fecha,
    empaquePeso: empaque.peso,
    empaqueTipo: tipoEmpaque,
  };
}
