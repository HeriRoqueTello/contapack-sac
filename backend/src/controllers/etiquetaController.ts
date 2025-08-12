import { Request, Response } from "express";
import Etiqueta from "../models/Etiqueta";
import Producto from "../models/Producto";
import Exportador from "../models/Exportador";
import Productor from "../models/Productor";
import Calibre from "../models/Calibre";
import Categoria from "../models/Categoria";

// Obtener datos dinámicos para selects
export const getDynamicData = async (req: Request, res: Response) => {
  try {
    const productores = await Productor.findAll({
      attributes: ["id", "clp"],
    });

    const productos = await Producto.findAll({
      attributes: ["id", "nombre"],
    });

    const exportadores = await Exportador.findAll({
      attributes: ["id", "nombreEmpresa"],
    });

    const calibres = await Calibre.findAll({
      attributes: ["id", "nombre"],
    });

    const categorias = await Categoria.findAll({
      attributes: ["id", "nombre"],
    });

    res.json({
      productores,
      productos,
      exportadores,
      calibres,
      categorias,
    });
  } catch (error) {
    console.error("Error obteniendo datos dinámicos:", error);
    res.status(500).json({ message: "Error obteniendo datos dinámicos" });
  }
};

// Obtener todas las etiquetas
export const obtenerEtiqueta = async (req: Request, res: Response) => {
  try {
    const etiquetas = await Etiqueta.findAll({
      include: [
        { model: Producto, attributes: ["nombre"] },
        { model: Calibre, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Exportador, attributes: ["nombreEmpresa"] },
        { model: Productor, attributes: ["clp"] },
      ],
    });

    console.log(
      "Etiquetas obtenidas con relaciones:",
      JSON.stringify(etiquetas, null, 2)
    );

    res.json(etiquetas);
  } catch (error) {
    console.error("Error en obtenerEtiqueta:", error);
    res.status(500).json({ error: "Error al obtener las etiquetas" });
  }
};

// Crear nueva etiqueta
export const crearEtiqueta = async (req: Request, res: Response) => {
  console.log("envio al back: ", req.body);

  try {
    const nuevaEtiqueta = await Etiqueta.create({
      trazabilidad: req.body.trazabilidad,
      estado: req.body.estado,
      productorId: req.body.productorId,
      productoId: req.body.productoId,
      exportadorId: req.body.exportadorId,
      calibreId: req.body.calibreId,
      categoriaId: req.body.categoriaId,
      destino: req.body.destino,
      fechaEmp: req.body.fechaEmp,
    });

    const etiquetaConRelaciones = await Etiqueta.findByPk(nuevaEtiqueta.id, {
      include: [
        {
          model: Producto,
          attributes: ["nombre"],
        },
        { model: Calibre, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Exportador, attributes: ["nombreEmpresa"] },
        { model: Productor, attributes: ["clp"] },
      ],
    });

    res.status(201).json(etiquetaConRelaciones);
  } catch (error) {
    console.error("Error al crear Etiqueta:", error);
    res.status(500).json({ error: "Error al crear la etiqueta" });
  }
};

// Actualizar etiqueta
export const actualizarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Etiqueta.update(
      {
        trazabilidad: req.body.trazabilidad,
        estado: req.body.estado,
        productorId: req.body.productorId,
        productoId: req.body.productoId,
        exportadorId: req.body.exportadorId,
        calibreId: req.body.calibreId,
        categoriaId: req.body.categoriaId,
      },
      { where: { id } }
    );

    const etiquetaActualizada = await Etiqueta.findByPk(id, {
      include: [
        {
          model: Producto,
          attributes: ["nombre"],
        },
        { model: Calibre, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },
        { model: Exportador, attributes: ["nombreEmpresa"] },
        { model: Productor, attributes: ["clp"] },
      ],
    });

    res.json(etiquetaActualizada);
  } catch (error) {
    console.error("Error al actualizar Etiqueta:", error);
    res.status(500).json({ error: "Error al actualizar la etiqueta" });
  }
};

// Eliminar etiqueta
export const eliminarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Etiqueta.destroy({ where: { id } });
    res.json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar Etiqueta:", error);
    res.status(500).json({ error: "Error al eliminar la etiqueta" });
  }
};

// Confirmar / desconfirmar etiqueta
export const confirmarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const etiqueta = await Etiqueta.findByPk(id);

    if (!etiqueta) {
      res.status(404).json({ error: "Etiqueta no encontrada" });
      return;
    }

    etiqueta.estado =
      etiqueta.estado === "Confirmado" ? "No Confirmado" : "Confirmado";
    await etiqueta.save();

    const etiquetaConfirmada = await Etiqueta.findByPk(id, {
      include: [
        {
          model: Producto,
          attributes: ["nombre"],
        },
        { model: Calibre, attributes: ["nombre"] },
        { model: Categoria, attributes: ["nombre"] },

        { model: Exportador, attributes: ["nombreEmpresa"] },
        { model: Productor, attributes: ["clp"] },
      ],
    });

    res.json(etiquetaConfirmada);
  } catch (error) {
    console.error("Error al confirmar Etiqueta:", error);
    res.status(500).json({ error: "Error al confirmar la etiqueta" });
  }
};
