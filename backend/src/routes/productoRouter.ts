import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerProductos } from "../controllers/ProductoController";

const router = Router();

router.use(authenticate); 
router.get("/", obtenerProductos);

export default router;