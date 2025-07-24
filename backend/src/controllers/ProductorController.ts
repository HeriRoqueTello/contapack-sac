import Producto from "../models/Productor";

export const obtenerProductor = async (req, res) => {
  try {
    const productor = await Producto.findAll({
      attributes: ["id", "nombre", "clp", "codigo"],
    });
    res.status(200).json(productor);
  } catch (error) {
    console.error("Error al obtener productos: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener productos" });
  }
};
