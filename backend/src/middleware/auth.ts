import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario"

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
    const error = new Error('No Autorizado')
    res.status(401).json({ error: error.message })
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    const error = new Error('No Autorizado')
    res.status(401).json({ error: error.message })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded.id) {
      req.user = await Usuario.findByPk(decoded.id, {
        attributes: ['id', 'name', 'email']
      })
      next()
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
}