import Categoria from "../models/Categoria";

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: ["id", "nombre"],
    });
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener categorías" });
  }
};
