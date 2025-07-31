import Chofer from "../models/chofer";

export const obtenerChoferes = async (req, res) => {
  try {
    const choferes = await Chofer.findAll();
    res.status(200).json(choferes);
  } catch (error) {
    console.error("Error al obtener choferes: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener choferes" });
  }
};
