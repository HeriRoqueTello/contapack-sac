export const fields = [
  {
    name: "nrPallet",
    label: "Número de pallet",
    type: "text",
    required: true,
  },
  { name: "calibre", label: "Calibre", type: "text", required: true },
  { name: "categoria", label: "Categoría", type: "text", required: true },
  {
    name: "tipEmp",
    label: "Tipo de empaque",
    type: "radioGroup",
    required: true,
    options: ["Cajas", "Canastillas"],
  },
  {
    name: "pesoEmp",
    label: "Peso por empaque",
    type: "text",
    required: true,
  },
  {
    name: "cantEmp",
    label: "Cantidad de empaques",
    type: "text",
    required: true,
  },
];