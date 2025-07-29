import Responsable from "../models/Responsable";

export const obtenerResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll;
    res.status(200).json(responsables);
  } catch (error) {
    console.error("Error al obtener responsables: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener responsables" });
  }
};
