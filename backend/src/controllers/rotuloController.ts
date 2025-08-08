import { Request, Response } from "express";
import Rotulo from "../models/Rotulo";
import Productor from "../models/Productor";
import Exportador from "../models/Exportador";
import Variedad from "../models/Variedad";
import Producto from "../models/Producto";
import RegistroMateriaPrima from "../models/RegistroMateriaPrima";
import Guia from "../models/GuiaProductor";


// Función reutilizable para actualizar lote
const actualizarLote = async (registroId: number) => {
  // Obtener todos los rótulos del lote
  const rotulosDelLote = await Rotulo.findAll({
    where: { registroMateriaPrimaId: registroId },
  });

  const pesoNeto = rotulosDelLote.reduce(
    (acc, r) => acc + (r.kgIngresados || 0),
    0
  );

  const cantJabas = rotulosDelLote.reduce(
    (acc, r) => acc + (r.bandJabas || 0),
    0
  );

  // Obtener el registro de materia prima
  const registro = await RegistroMateriaPrima.findByPk(registroId);

  if (!registro) return;

  // Obtener el peso guía desde la tabla Guia usando productorId
  const guia = await Guia.findOne({
    where: { productorId: registro.productorId },
  });

  const pesoGuia = guia?.pesoGuia || 0;

  const difPeso = pesoGuia - pesoNeto;

  // Actualizar el lote
  await RegistroMateriaPrima.update(
    {
      pesoNeto: pesoNeto.toFixed(2),
      cantJabas,
      difPeso: difPeso.toFixed(2),
    },
    { where: { id: registroId } }
  );
};

// Listar rótulos -- GET
export const obtenerRotulo = async (req: Request, res: Response) => {
  try {
    const rotulos = await Rotulo.findAll({
      include: [
        {
          model: Productor,
          attributes: ["nombre"],
        },
        {
          model: Exportador,
          attributes: ["nombreEmpresa"],
        },
        {
          model: Producto,
          attributes: ["nombre"],
          include: [
            {
              model: Variedad,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });
    res.status(200).json(rotulos);
  } catch (error) {
    console.error("Error al obtener rotulos: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};

// Crear rótulo -- POST
export const crearRotulo = async (req: Request, res: Response) => {
  try {
    const nuevoRotulo = await Rotulo.create(req.body);

    await actualizarLote(nuevoRotulo.registroMateriaPrimaId);

    res.status(201).json(nuevoRotulo);
  } catch (error) {
    console.error("Error al crear rótulo:", error);
    res.status(500).json({ mensaje: "Error al crear rótulo" });
  }
};

// Actualizar rótulo -- PUT
export const actualizarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const rotuloOriginal = await Rotulo.findByPk(id);
    if (!rotuloOriginal) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return
    }

    const loteAnteriorId = rotuloOriginal.registroMateriaPrimaId;

    await Rotulo.update(datosActualizados, { where: { id } });

    const rotuloFinal = await Rotulo.findByPk(id);
    const loteNuevoId = rotuloFinal?.registroMateriaPrimaId;

    // Recalcular lote anterior si cambió
    if (loteAnteriorId !== loteNuevoId) {
      await actualizarLote(loteAnteriorId);
    }

    // Recalcular lote nuevo
    if (loteNuevoId) {
      await actualizarLote(loteNuevoId);
    }

    res.status(200).json(rotuloFinal);
  } catch (error) {
    console.error("Error al actualizar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al actualizar" });
  }
};

// Eliminar rótulo -- DELETE
export const eliminarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rotuloEliminado = await Rotulo.findByPk(id);
    if (!rotuloEliminado) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
    }

    await Rotulo.destroy({ where: { id } });

    await actualizarLote(rotuloEliminado.registroMateriaPrimaId);

    res.status(200).json({ mensaje: "Rótulo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

// Confirmar rótulo -- PATCH
export const confirmarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rotulo = await Rotulo.findByPk(id);

    if (!rotulo) {
      res.status(404).json({ mensaje: "No encontrado" });
      return;
    }

    rotulo.estado =
      rotulo.estado === "Confirmado" ? "No confirmado" : "Confirmado";

    await rotulo.save();

    res.status(200).json(rotulo);
  } catch (error) {
    console.error("Error al confirmar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al confirmar" });
  }
};
