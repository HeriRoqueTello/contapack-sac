export const convertirChequeos = (chequeoSeleccionado = "") => ({
  materiaPrima: chequeoSeleccionado === "Materia Prima",
  frutaRechazada: chequeoSeleccionado === "Fruta Rechazada",
  descarte: chequeoSeleccionado === "Descarte",
});

export const detectarChequeo = (registro) => {
  if (registro.materiaPrima) return "Materia Prima";
  if (registro.frutaRechazada) return "Fruta Rechazada";
  if (registro.descarte) return "Descarte";
  return "";
};
