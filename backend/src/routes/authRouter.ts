import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()

<<<<<<< HEAD
// router.use(limiter)

=======
>>>>>>> 1efb5cccc269374d48d2b2bbb05412efa26d6162
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
