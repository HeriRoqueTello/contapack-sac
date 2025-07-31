import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerTransporteDescargas } from "../controllers/TransporteDescargaController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerTransporteDescargas);

export default router;
