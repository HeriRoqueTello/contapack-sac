import Variedad from "../models/Variedad";

export const obtenerVariedades = async (req, res) => {
  try {
    const variedades = await Variedad.findAll({
      attributes: ["id", "nombre"],
    });
    res.status(200).json(variedades);
  } catch (error) {
    console.error("Error al obtener variedades: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener variedades" });
  }
};
