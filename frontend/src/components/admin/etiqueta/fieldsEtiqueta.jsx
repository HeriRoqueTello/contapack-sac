export const fields = [
  {
    type: "sectionTitle",
    label: "Datos del Productor y Exportador",
  },
  {
    name: "productor",
    label: "CLP del Productor", 
    type: "select",
    required: true,
    options: ({ dynamic }) => {
      //Si productores no es un array retorna vacío
      if (!Array.isArray(dynamic?.productores)) return [];
      //Guarda nombres unicos de los productores
      const nombresUnicos = new Set();
      //Filtrar los nombres para obtener solo los que no se repiten
      const productoresFiltrados = dynamic.productores.filter((p) => {
        if (nombresUnicos.has(p.nombre)) return false;
        nombresUnicos.add(p.nombre);
        return true;
      });
      //Retorna los productores filtrados
      return productoresFiltrados.map((p) => ({
        label: p.clp,
        value: p.clp,   
        uniqueKey: p.id, 
      }));
    },
  },
  {
    name: "exportador",
    label: "Exportador",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      dynamic.exportadores?.map((e) => ({
        value: e.nombreEmpresa,
        label: e.nombreEmpresa,
        uniqueKey: e.id,
      })) || [],
  },
  {
    type: "sectionTitle",
    label: "Información de la Etiqueta",
  },
  {
    name: "trazabilidad",
    label: "Trazabilidad",
    type: "text",
    required: true,
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
    type: "text",
    required: true,
    options: () => [
      { value: "China", label: "China", uniqueKey: "cn" },
      { value: "Chile", label: "Chile", uniqueKey: "cl" },
      { value: "Japón", label: "Japón", uniqueKey: "jp" },
    ],
  },
  {
    type: "sectionTitle",
    label: "Detalles del Producto",
  },
  {
    name: "producto",
    label: "Producto",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      dynamic.productos?.map((p) => ({
        value: p.nombre,
        label: p.nombre,
        uniqueKey: p.id,
      })) || [],
  },
  {
    name: "variedad",
    label: "Variedad",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      dynamic.variedades?.map((v) => ({
        value: v.nombre,
        label: v.nombre,
        uniqueKey: v.id,
      })) || [],
  },
  {
    name: "calibre",
    label: "Calibre",
    type: "number",
    required: true,
    placeholder: "Ej: 18",
  },
  {
    name: "categoria",
    label: "Categoría",
    type: "text",
    required: true,
    placeholder: "Ej: I", // Ajustado placeholder
  },
];
