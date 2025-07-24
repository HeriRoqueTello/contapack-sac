import Producto from "../models/Producto";
import Variedad from "../models/Variedad";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: ["id", "nombre"],
      include: [
        {
          model: Variedad,
          attributes: ["nombre"],
        },
      ],
    });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener productos" });
  }
}
