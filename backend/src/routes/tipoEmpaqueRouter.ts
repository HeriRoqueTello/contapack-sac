import { Router } from "express";
import { obtenerTipoEmpaque } from "../controllers/TipoEmpaqueController";

const router = Router();

router.get("/", obtenerTipoEmpaque);

export default router;
