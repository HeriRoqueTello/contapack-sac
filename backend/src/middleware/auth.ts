import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario"
import Rol from "../models/Rol"
import Area from "../models/Area"

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
    const error = new Error('No Autorizado: Token no presente')
    res.status(401).json({ error: error.message })
    return
  }

  const [, token] = bearer.split(' ')
  console.log({ token })

  if (!token) {
    const error = new Error('No Autorizado: Formato de token incorrecto')
    res.status(401).json({ error: error.message })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded.id) {
      console.log({ decoded }, typeof decoded, { id: decoded.id })
      const user = await Usuario.findByPk(decoded.id, {
        attributes: ['id', 'nombre', 'apellido', 'email'],
        include: [
          {
            model: Rol,
            attributes: ['descripcion']
          },
          {
            model: Area,
            attributes: ['descripcion']
          }
        ]
      })

      if (user) {
        req.user = user
        next()
      } else {
        // El token es válido, pero el usuario no se encuentra
        res.status(401).json({ error: 'No autorizado: Usuario no encontrado' })
      }
    } else {
      res.status(401).json({ error: 'No autorizado: Token inválido' });
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'No autorizado: Token inválido o expirado' });
      return
    }
    res.status(500).json({ error: 'Error en el servidor' })
  }
}