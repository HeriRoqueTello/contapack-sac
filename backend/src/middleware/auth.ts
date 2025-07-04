import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { dataSource } from "../config/db";
import { Usuario } from "../models/Usuario";

const userRepository = dataSource.getRepository(Usuario);

declare global {
  namespace Express {
    interface Request {
      user?: Usuario
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    const error = new Error('No autorizado');
    res.status(401).json({ error: error.message })
    return
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    const error = new Error('No autorizado');
    res.status(401).json({ error: error.message })
    return
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result === 'object' && result.id) {
      const user = await userRepository.findOne({
        where: { IdUsuario: result.id },
        select: [ // Especifica las columnas que quieres seleccionar (todas menos password)
          "IdUsuario", "Nombres", "Apellido", "Telefono", "Email", "Estado",
          "IdRol", "IdArea"
          // Asegúrate de incluir aquí todas las columnas que quieres que el frontend reciba
          // y que no sean sensibles (como 'password')
        ]
      });
      if (!user) {
        const error = new Error('Usuario no encontrado');
        res.status(404).json({ error: error.message })
        return
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Token invalido" });
  }
}