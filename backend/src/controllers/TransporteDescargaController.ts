import Chofer from "../models/chofer";
import TransporteDescarga from "../models/TransporteDescarga";

export const obtenerTransporteDescargas = async (req, res) => {
  try {
    const transporteDescargas = await TransporteDescarga.findAll({
      include: [
        {
          model: Chofer,
        },
      ],
    });
    res.status(200).json(transporteDescargas);
  } catch (error) {
    console.error("Error al obtener transporte de descargas: ", error);
    res
      .status(500)
      .json({ mensaje: "Error interno al obtener transporte de descargas" });
  }
};
