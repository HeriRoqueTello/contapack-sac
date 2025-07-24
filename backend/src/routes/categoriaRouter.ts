import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerCategorias } from "../controllers/CategoriaController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerCategorias);

export default router;
