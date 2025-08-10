import { Request, Response } from "express";
import TipoEmpaque from "../models/TipoEmpaque";

export const obtenerTipoEmpaque = async (req: Request, res: Response) => {
  try {
    const tipoEmpaque = await TipoEmpaque.findAll();
    res.status(200).json(tipoEmpaque);
  } catch (error) {
    console.log("Error al obtener los tipos de empaque");
    res.status(500).json({ mensaje: "Error al obtener los tipos de empaque" });
  }
};
