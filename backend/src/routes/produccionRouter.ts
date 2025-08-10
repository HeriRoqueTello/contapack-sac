import { Router } from "express";
import {
  actualizarProduccion,
  confirmarProduccion,
  crearProduccion,
  eliminarProduccion,
  obtenerProduccion,
} from "../controllers/ProduccionController";

const router = Router();

router.get("/", obtenerProduccion);
router.post("/", crearProduccion);
router.put("/:id", actualizarProduccion);
router.delete("/:id", eliminarProduccion);

router.patch("/confirmar/:id", confirmarProduccion);

export default router;
