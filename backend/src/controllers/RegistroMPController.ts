import { Request, Response } from "express";
import RegistroMateriaPrima from "../models/RegistroMateriaPrima";
import Exportador from "../models/Exportador";
import Productor from "../models/Productor";

//listar registro -- GET
export const obtenerRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await RegistroMateriaPrima.findAll({
      include: [
        { model: Productor, attributes: ["id", "nombre"] },
        { model: Exportador, attributes: ["id", "nombreEmpresa"] },
      ],
    });
    res.status(200).json(registros);
  } catch (error) {
    console.log("Error al obtener registros: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};

//crear registro -- POST
export const crearRegistro = async (req: Request, res: Response) => {
  try {
    const { exportadorId, productorId, ...resto } = req.body;

    //Obtener códigos desde las tablas relacionadas
    const exportador = await Exportador.findByPk(exportadorId);
    const productor = await Productor.findByPk(productorId);

    if (!exportador || !productor) {
      return res
        .status(404)
        .json({ mensaje: "Exportador o Productor no encontrado" });
    }

    const codigoGenerado = `${exportador.codigo}${productor.codigo}`;

    //Crear el registro con el código generado
    const nuevo = await RegistroMateriaPrima.create({
      ...resto,
      exportadorId,
      productorId,
      codigo: codigoGenerado,
    });
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
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
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
      res.status(404).json({ mensaje: "Registro no encontrado" });
      return;
    }

    // y si no vale 0 es porque encontro y eliminó el registro
    res.status(200).json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar registro: ", error);
    res.status(500).json({ mensaje: "Error interno al eliminar" });
  }
};

//confirrmar Registro
export const confirmarRegitro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registro = await RegistroMateriaPrima.findByPk(id);
    if (!registro) {
      res.status(404).json({ mensaje: "no encontrado" });
      return;
    }

    registro.estado =
      registro.estado === "Confirmado" ? "No confirmado" : "Confirmado";

    // ----------Alternativa para cambiar el estado-----------
    // if(registro.estado === "Confirmado") {
    //   registro.estado = "No confirmado";
    // } else {
    //   registro.estado = "Confirmado";
    // }

    await registro.save();
    res.status(200).json(registro);
  } catch (error) {
    console.error("Error al confirmar rotulo: ", error);
    res.status(500).json({ mensaje: "Error interno al confirmar" });
  }
};
