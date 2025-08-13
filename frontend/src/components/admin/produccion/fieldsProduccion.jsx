export const fields = [
  // === SECCIÓN PRODUCTO ===
  {
    type: "sectionTitle",
    label: "Datos del Producto",
  },
  {
    name: "etiquetaNumero",
    label: "Código de etiqueta",
    type: "combo",
    required: true,
    options: ({ dynamic }) => {
      if (!Array.isArray(dynamic?.etiquetas)) return [];
      return dynamic.etiquetas.map((e) => ({
        label: `${e.id} - ${e.Producto.nombre}`,
        value: e.id,
      }));
    },
    onChange: ({ value, dynamic, setValue }) => {
      const etiquetaSeleccionada = dynamic.etiquetas.find(
        (e) => e.id === value
      );

      if (etiquetaSeleccionada) {
        const { Producto, Variedad, calibre, categoria } = etiquetaSeleccionada;

        setValue("productoNombre", Producto?.nombre || "");
        setValue("productoVariedad", Variedad?.nombre || "");
        setValue("productoCalibre", calibre || "");
        setValue("productoCategoria", categoria || "");
      }
    },
  },
  {
    name: "productoNombre",
    label: "Nombre del Producto",
    type: "text",
    required: true,
    readOnly: true,
  },
  {
    name: "productoVariedad",
    label: "Variedad",
    type: "text",
    required: true,
    readOnly: true,
  },
  {
    name: "productoCalibre",
    label: "Calibre",
    type: "text",
    required: true,
    readOnly: true,
  },
  {
    name: "productoCategoria",
    label: "Categoría",
    type: "text",
    required: true,
    readOnly: true,
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
