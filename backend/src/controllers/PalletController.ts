import { Request, Response } from "express";
import Pallet from "../models/Pallet";
import Empaque from "../models/Empaque";
import TipoEmpaque from "../models/TipoEmpaque";

export const obtenerPallets = async (req: Request, res: Response) => {
  try {
    const pallets = await Pallet.findAll({
      include: [
        {
          model: Empaque,
          include: [
            {
              model: TipoEmpaque,
            },
          ],
        },
      ],
    });
    res.status(200).json(pallets);
  } catch (error) {
    console.error("Error al obtener pallets: ", error);
    res.status(500).json({ mensaje: "Error interno al obtener pallets" });
  }
};
