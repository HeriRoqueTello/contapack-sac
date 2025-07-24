import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerVariedades } from "../controllers/VariedadController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerVariedades);

export default router;
