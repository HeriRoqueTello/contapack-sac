import { Request, Response } from "express";
import RegistroMateriaPrima from "../models/RegistroMateriaPrima";

//listar registro -- GET
export const obtenerRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await RegistroMateriaPrima.findAll();
    res.status(200).json(registros);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};

//crear registro -- POST
export const crearRegistro = async (req: Request, res: Response) => {
  try {
    console.log("🧾 Datos recibidos:", req.body);
    const nuevo = await RegistroMateriaPrima.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear registro: ", error);
    res.status(500).json({ mensaje: "Error al crear lote" });
  }
};

//actualizar registro -- PUT
export const actualizarRegistro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; //extraemos el ID de la url
    const datosActualizados = req.body; //lo que se va a actualizar

    // Ejecutamos el update
    await RegistroMateriaPrima.update(datosActualizados, { where: { id } });

    // Buscamos el registro actualizado para devolverlo
    const registroFinal = await RegistroMateriaPrima.findByPk(id);

    // No encontró el registro
    if (!registroFinal) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }

    // Encontro el registro
    res.status(200).json(registroFinal);
  } catch (error) {
    console.error("Error al actualizar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al actualizar" });
  }
};

//Eliminar registro -- DELETE
export const eliminarRegistro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await RegistroMateriaPrima.destroy({ where: { id } });

    // destroy solo usa 0 y 1
    // se usa 0 porque no encontró el registro
    if (eliminado === 0) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }

    // y si no vale 0 es porque encontro y eliminó el registro
    res.status(200).json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};
