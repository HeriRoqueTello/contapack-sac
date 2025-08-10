import { Request, Response } from "express";
import TipoEmpaque from "../models/TipoEmpaque";
import Empaque from "../models/Empaque";

export const obtenerEmpaques = async (req: Request, res: Response) => {
  try {
    const empaques = Empaque.findAll({
      include: [
        {
          model: TipoEmpaque,
        },
      ],
    });
    res.status(200).json(empaques);
  } catch (error) {
    console.log("Error al obtener empaques: ", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los datos" });
  }
};
