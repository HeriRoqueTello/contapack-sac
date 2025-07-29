import { Request, Response } from "express";
import Etiqueta from "../models/Etiqueta";
import Producto from "../models/Producto";
import Exportador from "../models/Exportador";
import Productor from "../models/Productor";

// Obtener todas las etiquetas
export const obtenerEtiqueta = async (req: Request, res: Response) => {
  try {
    const etiquetas = await Etiqueta.findAll({
      include: [
        { model: Producto, attributes: ["nombre"] },
        { model: Exportador, attributes: ["nombreEmpresa"] },
        { model: Productor, attributes: ["clp"] },
      ],
    });
    res.json(etiquetas);
  } catch (error) {
    console.error("Error en obtenerEtiqueta:", error);
    res.status(500).json({ error: "Error al obtener las etiquetas" });
  }
};

// Crear nueva etiqueta
export const crearEtiqueta = async (req: Request, res: Response) => {
  try {
    console.log("Datos recibidos en crearEtiqueta:", req.body);

    const nuevaEtiqueta = await Etiqueta.create({
      trazabilidad: req.body.trazabilidad,
      estado: req.body.estado,
      productorId: req.body.productorId,
      productoId: req.body.productoId,
      exportadorId: req.body.exportadorId,
    });

    const etiquetaConRelaciones = await Etiqueta.findByPk(nuevaEtiqueta.id, {
      include: [{ model: Productor, attributes: ["clp"] }],
    });

    res.json(etiquetaConRelaciones);
  } catch (error) {
    console.error("Error al crear Etiqueta:", error);
    res.status(500).json({ error: "Error al crear la etiqueta" });
  }
};

// Actualizar etiqueta
export const actualizarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Etiqueta.update(req.body, { where: { id } });

    const etiquetaActualizada = await Etiqueta.findByPk(id, {
      include: [
        { model: Producto, attributes: ["nombre"] },
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

// Confirmar etiqueta
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
        { model: Producto, attributes: ["nombre"] },
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
