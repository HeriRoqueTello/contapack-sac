import Calibre from "../models/Calibre";

export const obtenerCalibres = async (req, res) => {
  try {
    const calibres = await Calibre.findAll({
      attributes: ["id", "nombre"],
    });
    res.status(200).json(calibres);
  } catch (error) {
    console.error("Error al obtener calibres: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener calibres" });
  }
};
