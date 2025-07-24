import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerExportadores } from "../controllers/ExportadorController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerExportadores);

export default router;