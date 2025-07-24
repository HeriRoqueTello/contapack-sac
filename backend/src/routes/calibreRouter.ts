import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerCalibres } from "../controllers/CalibreController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerCalibres);

export default router; 
