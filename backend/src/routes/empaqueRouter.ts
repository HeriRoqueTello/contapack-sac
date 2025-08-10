import { Router } from "express";
import { obtenerEmpaques } from "../controllers/EmpaqueController";

const router = Router();

router.get("/", obtenerEmpaques);

export default router;
