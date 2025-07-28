export const fields = [
  {
    name: "trazabilidad",
    label: "Trazabilidad",
    type: "text",
    required: true,
  },
  {
    name: "productorId",
    label: "CLP",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      dynamic.productores?.map((prod) => ({
        value: prod.id,    
        label: prod.clp,   
      })) || [],
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
  {
    name: "exportadorId",
    label: "Exportador",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.exportadores)
        ? dynamic.exportadores.map((e) => ({
            label: e.nombreEmpresa,
            value: e.id,
          }))
        : [],
  },
];


