import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { obtenerProductor } from "../controllers/ProductorController";

const router = Router();

router.use(authenticate);
router.get("/", obtenerProductor);

export default router;