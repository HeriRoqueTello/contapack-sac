import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerChoferes } from "../controllers/ChoferController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerChoferes);

export default router;
