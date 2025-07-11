import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"
import Usuario from "../models/Usuario"


export class AuthController {

  static createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const userExists = await Usuario.findOne({
      where: {
        email
      }
    })

    if (userExists) {
      res.status(409).json({ error: 'Email ya registrado' })
      return
    }

    try {
      const user = new Usuario(req.body)
      user.password = await hashPassword(password)
      await user.save()

      res.json('Cuenta creada')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Hubo un error' })
    }

  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await Usuario.findOne({ // SELECT * FROM USER WHERE EMAIL = EMAIL
      where: {
        email
      }
    })

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" }) // 404: Not found
      return
    }

    const isPasswordCorrect = await checkPassword(password, user.password)

    if (!isPasswordCorrect) {
      res.status(401).json({ error: "Password incorrecto" })
      return
    }

    const token = generateJWT({ id: user.id })

    res.json(token)
  }

  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }


}