import Exportador from "../models/Exportador";

export const obtenerExportadores = async (req, res) => {
  try {
    const exportadores = await Exportador.findAll({
      attributes: ["id", "nombreEmpresa", "codigo"],
    });
    res.status(200).json(exportadores);
  } catch (error) {
    console.error("Error al obtener exportadores: ", error);
    throw new Error("Error interno al obtener exportadores");
  }
};
