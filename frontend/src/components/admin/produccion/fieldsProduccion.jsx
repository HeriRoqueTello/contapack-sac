export const fields = [
  {
    name: "numero de pallet",
    label: "Número de pallet",
    type: "text",
    required: true,
  },
  { name: "calibre", label: "Calibre", type: "text", required: true },
  { name: "categoria", label: "Categoría", type: "text", required: true },
  {
    name: "tipo de empaque",
    label: "Tipo de empaque",
    type: "radioGroup",
    required: true,
    options: ["Cajas", "Canastillas"],
  },
  {
    name: "peso por empaque",
    label: "Peso por empaque",
    type: "text",
    required: true,
  },
  {
    name: "cantidad de empaques",
    label: "Cantidad de empaques",
    type: "text",
    required: true,
  },
];

// JUAN ULTIMO CAMBIO
// [
//   {name: "nrPallet", label: "Número de pallet", type: "text", required: true},
//   {name: "calibre", label: "Calibre", type: "text", required: true},
//   {name: "categoria", label: "Categoría", type: "text", required: true},
//   {name: "pesoEmp", label: "Peso por empaque", type: "text", required: true}
// ]