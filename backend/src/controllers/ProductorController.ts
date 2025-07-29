import Guia from "../models/GuiaProductor";
import Productor from "../models/Productor";
import Responsable from "../models/Responsable";

export const obtenerProductor = async (req, res) => {
  try {
    const productor = await Productor.findAll({
      attributes: ["id", "nombre", "clp", "codigo"],
      include: [
        {
          model: Guia,
          attributes: ["guiaProductor", "pesoGuia"],
        },
        {
          model: Responsable,
          attributes: ["nombre"],
        },
      ],
    });
    res.status(200).json(productor);
  } catch (error) {
    console.error("Error al obtener productos: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener productos" });
  }
};
