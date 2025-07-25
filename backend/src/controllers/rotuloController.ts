import { Request, Response } from "express";
import Rotulo from "../models/Rotulo";
import Productor from "../models/Productor";
import Exportador from "../models/Exportador";
import Variedad from "../models/Variedad";
import Producto from "../models/Producto";

//listar rotulos -- GET
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

//crear rotulo -- POST
export const crearRotulo = async (req: Request, res: Response) => {
  try {
    const nuevo = await Rotulo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.log("Error al crear registro: ", error);
    res.status(500).json({ mensaje: "Error al crear rotulo" });
  }
};

//actualizar rotulo -- PUT
export const actualizarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; //extraemos el ID de la url
    const datosActualizados = req.body; //lo que se va a actualizar

    //Ejecutamos el update
    await Rotulo.update(datosActualizados, { where: { id } });

    //Buscamos el rotulo actualizado para devolverlo
    const rotuloFinal = await Rotulo.findByPk(id);

    //No encontró el rotulo
    if (!rotuloFinal) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return
    }

    //Encontro el rotulo
    res.status(200).json(rotuloFinal);
  } catch (error) {
    console.error("Error al actualizar rotuoo: ", error);
    res.status(500).json({ mensaje: "Error interno al actualizar" });
  }
};

//Eliminar rotulo --DELETE
export const eliminarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await Rotulo.destroy({ where: { id } });

    // destroy solo usa 0 y 1
    // se usa 0 porque no encontró el rotulo
    if (eliminado === 0) {
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return
    }

    // y si no vale 0 es porque encontro y eliminó el rotulo
    res.status(200).json({ mensaje: "Rotulo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

//confirrmar Rotulo
export const confirmarRotulo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rotulo = await Rotulo.findByPk(id);
    if (!rotulo) {
      res.status(404).json({ mensaje: "no encontrado" });
      return
    }

    rotulo.estado =
      rotulo.estado === "Confirmado" ? "No confirmado" : "Confirmado";

    // ----------Alternativa para cambiar el estado-----------
    // if(rotulo.estado === "Confirmado") {
    //   rotulo.estado = "No confirmado";
    // } else {
    //   rotulo.estado = "Confirmado";
    // }

    await rotulo.save();
    res.status(200).json(rotulo);
  } catch (error) {
    console.error("Error al confirmar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al confirmar" });
  }
};
