import { Router } from "express";
import { obtenerGuias } from "../controllers/GuiaController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/", obtenerGuias);

export default router;
