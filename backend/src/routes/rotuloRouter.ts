import { Router } from "express";
import {
  actualizarRotulo,
  confirmarRotulo,
  crearRotulo,
  eliminarRotulo,
  obtenerRotulo,
} from "../controllers/rotuloController";

const router = Router();

router.get("/", obtenerRotulo);
router.post("/", crearRotulo);
router.put("/:id", actualizarRotulo);
router.delete("/:id", eliminarRotulo);

router.patch("/confirmar/:id", confirmarRotulo);

export default router;
