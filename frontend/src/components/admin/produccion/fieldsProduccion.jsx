export const fields = [
  // === SECCIÓN PRODUCTO ===
  {
    type: "sectionTitle",
    label: "Datos del Producto",
  },
  {
    name: "productoNombre",
    label: "Nombre del Producto",
    type: "text",
    required: true,
    placeholder: "Ej: Uva",
  },
  {
    name: "productoVariedad",
    label: "Variedad",
    type: "text",
    required: true,
    placeholder: "Ej: Red Globe",
  },
  {
    name: "productoCalibre",
    label: "Calibre",
    type: "text",
    required: true,
    placeholder: "Ej: Jumbo",
  },
  {
    name: "productoCategoria",
    label: "Categoría",
    type: "text",
    required: true,
    placeholder: "Ej: Categoría I",
  },

  // === SECCIÓN PALLET ===
  {
    type: "sectionTitle",
    label: "Datos del Pallet",
  },
  {
    name: "palletNumero",
    label: "Número de Pallet",
    type: "text",
    required: true,
  },
  {
    name: "palletCantidad",
    label: "Cantidad de Cajas/Canastillas",
    type: "number",
    required: true,
  },
  {
    name: "palletPeso",
    label: "Peso Total del Pallet (kg)",
    type: "number",
    required: true,
  },

  // === SECCIÓN EMPAQUE ===
  {
    type: "sectionTitle",
    label: "Datos del Empaque",
  },
  {
    name: "empaqueFecha",
    label: "Fecha de Empaque",
    type: "date",
    required: true,
  },
  {
    name: "empaquePeso",
    label: "Peso por Empaque (kg)",
    type: "number",
    required: true,
  },
  {
    name: "empaqueTipo",
    label: "Tipo de Empaque",
    type: "select",
    required: true,
    options: [
      { value: "Cajas", label: "Cajas" },
      { value: "Canastillas", label: "Canastillas" },
    ],
  },
];
