import Guia from "../models/GuiaProductor";

export const obtenerGuias = async (req, res) => {
  try {
    const guias = await Guia.findAll();
    res.status(200).json(guias);
  } catch (error) {
    console.error("Error al obtener guías: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener guías" });
  }
};
