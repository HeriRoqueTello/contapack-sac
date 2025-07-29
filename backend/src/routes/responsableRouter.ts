import { Router } from "express";
import { obtenerResponsables } from "../controllers/ResponsableController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/", obtenerResponsables);

export default router;
