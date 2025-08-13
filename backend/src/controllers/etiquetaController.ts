import { Request, Response } from "express";
import Etiqueta from "../models/Etiqueta";
import Producto from "../models/Producto";
import Exportador from "../models/Exportador";
import Productor from "../models/Productor";
import Variedad from "../models/Variedad";

// 1. OBTENER TODAS LAS ETIQUETAS (GET)
export const obtenerEtiqueta = async (req: Request, res: Response) => {
  try {
    const etiquetas = await Etiqueta.findAll({
      include: [
        { model: Productor },
        { model: Exportador },
        { model: Producto },
        { model: Variedad },
      ],
    });
    res.status(200).json(etiquetas);
  } catch (error) {
    console.log("Error al obtener etiquetas: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};

// 2. CREAR UNA NUEVA ETIQUETA (POST)
export const crearEtiqueta = async (req: Request, res: Response) => {
  try {
    const {
      productor: productorData,
      exportador: exportadorData,
      producto: productoData,
      variedad: variedadData,
      ...etiquetaData
    } = req.body;

    // Validaciones
    if (!productorData?.clp)
      return res
        .status(400)
        .json({ mensaje: "El CLP del productor es obligatorio." });
    if (!exportadorData?.nombreEmpresa)
      return res
        .status(400)
        .json({ mensaje: "El nombre del exportador es obligatorio." });
    if (!productoData?.nombre)
      return res
        .status(400)
        .json({ mensaje: "El nombre del producto es obligatorio." });
    if (!variedadData?.nombre)
      return res
        .status(400)
        .json({ mensaje: "El nombre de la variedad es obligatorio." });

    // --- LÓGICA SIMPLIFICADA Y CORRECTA ---

    const productor = await Productor.findOne({
      where: { clp: productorData.clp },
    });
    if (!productor) {
      return res.status(404).json({
        mensaje: `El productor con CLP '${productorData.clp}' no fue encontrado.`,
      });
    }

    const [exportador] = await Exportador.findOrCreate({
      where: { nombreEmpresa: exportadorData.nombreEmpresa },
      defaults: {
        nombreEmpresa: exportadorData.nombreEmpresa,
        codigo: exportadorData.codigo || "DEF",
      },
    });
    const [variedad] = await Variedad.findOrCreate({
      where: { nombre: variedadData.nombre },
      defaults: { nombre: variedadData.nombre },
    });

    const [producto] = await Producto.findOrCreate({
      where: { nombre: productoData.nombre, variedadId: variedad.id },
      defaults: {
        nombre: productoData.nombre,
        variedadId: variedad.id,
      },
    });

    etiquetaData.productorId = productor.id;
    etiquetaData.exportadorId = exportador.id;
    etiquetaData.productoId = producto.id;
    etiquetaData.variedadId = variedad.id;
    etiquetaData.calibre = parseInt(etiquetaData.calibre, 10);

    if (isNaN(etiquetaData.calibre)) {
      return res
        .status(400)
        .json({ mensaje: "Calibre y Categoría deben ser números válidos." });
    }

    const nuevaEtiqueta = await Etiqueta.create(etiquetaData);
    res.status(201).json(nuevaEtiqueta);
  } catch (error) {
    console.error("Error al crear Etiqueta:", error);
    res.status(500).json({ mensaje: "Error al crear la etiqueta" });
  }
};

// 3. ACTUALIZAR UNA ETIQUETA (PUT)
export const actualizarEtiqueta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    productor: productorData,
    exportador: exportadorData,
    producto: productoData,
    variedad: variedadData,
    ...etiquetaData
  } = req.body;

  try {
    const etiqueta = await Etiqueta.findByPk(id);

    if (!etiqueta) {
      return res.status(404).json({ mensaje: "Etiqueta no encontrada" });
    }

    // --- Validaciones (similar a crearEtiqueta) ---
    if (!productorData?.clp)
      return res
        .status(400)
        .json({ mensaje: "El CLP del productor es obligatorio." });
    if (!exportadorData?.nombreEmpresa)
      return res
        .status(400)
        .json({ mensaje: "El nombre del exportador es obligatorio." });
    if (!productoData?.nombre)
      return res
        .status(400)
        .json({ mensaje: "El nombre del producto es obligatorio." });
    if (!variedadData?.nombre)
      return res
        .status(400)
        .json({ mensaje: "El nombre de la variedad es obligatorio." });

    const [productor] = await Productor.findOrCreate({
      where: { clp: productorData.clp },
      defaults: {
        nombre: productorData.nombre || "Nombre por defecto",
        clp: productorData.clp,
        lugReferencia: productorData.lugReferencia || "Lugar por defecto",
        codigo: productorData.codigo || "0000",
      },
    });

    const [exportador] = await Exportador.findOrCreate({
      where: { nombreEmpresa: exportadorData.nombreEmpresa },
      defaults: {
        nombreEmpresa: exportadorData.nombreEmpresa,
        codigo: exportadorData.codigo || "DEF",
      },
    });

    const [variedad] = await Variedad.findOrCreate({
      where: { nombre: variedadData.nombre },
      defaults: { nombre: variedadData.nombre },
    });

    const [producto] = await Producto.findOrCreate({
      where: { nombre: productoData.nombre, variedadId: variedad.id },
      defaults: {
        nombre: productoData.nombre,
        variedadId: variedad.id,
      },
    });

    // --- Asignar IDs de las entidades relacionadas a los campos de la etiqueta ---
    etiquetaData.productorId = productor.id;
    etiquetaData.exportadorId = exportador.id;
    etiquetaData.productoId = producto.id;
    etiquetaData.variedadId = variedad.id;

    // --- Convertir calibre a número y validar (similar a crearEtiqueta) ---
    etiquetaData.calibre = parseInt(etiquetaData.calibre, 10);
    if (isNaN(etiquetaData.calibre)) {
      return res
        .status(400)
        .json({ mensaje: "Calibre debe ser un número válido." });
    }
    // --- Actualizar la etiqueta con los nuevos datos (incluyendo los FKs) ---
    await etiqueta.update(etiquetaData);

    res.status(200).json(etiqueta);
  } catch (error) {
    console.error("Error al actualizar Etiqueta:", error);
    res.status(500).json({ mensaje: "Error al actualizar la etiqueta" });
  }
};

// 4. ELIMINAR UNA ETIQUETA (DELETE)
export const eliminarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Etiqueta.destroy({ where: { id } });
    res.status(200).json({ mensaje: "Etiqueta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar Etiqueta:", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

// 5. CONFIRMAR UNA ETIQUETA
export const confirmarEtiqueta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const etiqueta = await Etiqueta.findByPk(id);
    if (!etiqueta) {
      return res.status(404).json({ mensaje: "Etiqueta no encontrada" });
    }
    etiqueta.estado =
      etiqueta.estado === "Confirmado" ? "No confirmado" : "Confirmado";
    await etiqueta.save();
    res.status(200).json(etiqueta);
  } catch (error) {
    console.log("Error al confirmar etiqueta: ", error);
    res.status(500).json({ mensaje: "Error interno al confirmar" });
  }
};

// 6. OBTENER DATOS PARA FORMULARIOS (GET)
export const getDynamicData = async (req: Request, res: Response) => {
  try {
    const [productores, exportadores, productos, variedades] =
      await Promise.all([
        Productor.findAll(),
        Exportador.findAll(),
        Producto.findAll(),
        Variedad.findAll(),
      ]);
    res.status(200).json({
      productores,
      exportadores,
      productos,
      variedades,
    });
  } catch (error) {
    console.error("Error al obtener datos dinámicos para etiquetas: ", error);
    res.status(500).json({ mensaje: "Error al obtener datos dinámicos" });
  }
};
