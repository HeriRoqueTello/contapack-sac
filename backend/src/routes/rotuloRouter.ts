import { Router } from "express";
import {
  actualizarRotulo,
  confirmarRotulo,
  crearRotulo,
  eliminarRotulo,
  obtenerRotulo,
} from "../controllers/rotuloController";

const router = Router();

router.get("/rotulo", obtenerRotulo);
router.post("/rotulo", crearRotulo);
router.put("/rotulo/:id", actualizarRotulo);
router.delete("/rotulo/:id", eliminarRotulo);

router.patch("/rotulo/confirmar/:id", confirmarRotulo);

export default router;
