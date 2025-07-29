export const fields = [
  { name: "fecha", label: "Fecha", type: "date", required: true },
  {
    name: "productorId",
    label: "Productor/Proveedor",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.productores)
        ? dynamic.productores.map((p) => ({
            label: `${p.nombre} (${p.clp}) (${p.codigo})`,
            value: p.id,
          }))
        : [],
  },
  {
    name: "kgIngresados",
    label: "KG Ingresados",
    type: "text",
    required: true,
  },

  {
    name: "productoId",
    label: "Producto",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.productos)
        ? dynamic.productos.map((p) => ({
            label: `${p.nombre} - ${p.Variedad?.nombre || "Sin variedad"}`,
            value: p.id,
          }))
        : [],
  },

  // {
  //   name: "variedadId",
  //   label: "Variedad",
  //   type: "select",
  //   required: true,
  //   options: ({ dynamic }) =>
  //     Array.isArray(dynamic?.variedades)
  //       ? dynamic.variedades.map((v) => ({
  //           label: `${v.nombre}`,
  //           value: v.id,
  //         }))
  //       : [],
  // },

  { name: "numIngreso", label: "N° Ingreso", type: "text", required: true },
  {
    name: "exportadorId",
    label: "Exportador",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.exportadores)
        ? dynamic.exportadores.map((e) => ({
            label: `${e.nombreEmpresa}`,
            value: e.id,
          }))
        : [],
  },
  { name: "responsable", label: "Responsable", type: "text", required: true },
  {
    name: "bandJabas",
    label: "Bandejas/Jabas",
    type: "text",
    required: true,
  },
  { name: "numPallet", label: "N° Pallet", type: "text", required: true },
  {
    name: "trazRecepcion",
    label: "Trazabilidad Recepcion",
    type: "text",
    required: true,
  },
  {
    name: "fechaProceso",
    label: "Fecha de Proceso",
    type: "date",
    required: true,
  },
  { name: "firma", label: "Firma", type: "text", required: false },
  {
    name: "obs",
    label: "Observaciones",
    type: "text",
    required: false,
  },
  {
    name: "registroMateriaPrimaId",
    label: "Lote asociado",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.registrosMP)
        ? dynamic.registrosMP.map((r) => ({
            label: r.nombreLote || `Lote #${r.id}`,
            value: r.id,
          }))
        : [],
  },
  {
    name: "chequeos",
    type: "radioGroup",
    required: true,
    fullRow: true,
    options: ["Materia Prima", "Fruta Rechazada", "Descarte"],
  },
];
