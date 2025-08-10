export const fields = [
  
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
    name: "calibreId", 
    label: "Calibre",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.calibres)
        ? dynamic.calibres.map((c) => ({
            value: c.id,
            label: c.nombre,
          }))
        : [],
  },
  {
    name: "categoriaId", 
    label: "Categoría",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.categorias)
        ? dynamic.categorias.map((ca) => ({
            value: ca.id,
            label: ca.nombre,
          }))
        : [],
  },  

  {
    name: "fechaEmp",
    label: "Fecha de Empaque",
    type: "date",
    required: true,
  },

   {
    name: "destino",
    label: "Destino",
    type: "select",
    required: true,
    options: () => [
    { value: "China", label: "China" },
    { value: "Chile", label: "Chile" },
    { value: "Japón", label: "Japón" },
    ],
  },


  {
    name: "trazabilidad",
    label: "Trazabilidad",
    type: "text",
    required: true,
  },

  
];


