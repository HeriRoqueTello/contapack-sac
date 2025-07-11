import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router()

router.use(limiter)

router.post('/create-account',
  body('nombre')
    .notEmpty().withMessage("El nombre no puede ir vacio"),
  body('password')
    .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
  body('email')
    .isEmail().withMessage('Email no valido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post('/login',
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Email no valido'),
  body('password')
    .notEmpty().withMessage('El password es obligatorio'),
  handleInputErrors,
  AuthController.login
)

router.get('/user',
  authenticate,
  AuthController.user
)

export default router