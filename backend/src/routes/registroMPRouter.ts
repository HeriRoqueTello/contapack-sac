import { Router } from "express";
import {
  crearRegistro,
  obtenerRegistros,
  actualizarRegistro,
  eliminarRegistro,
  confirmarRegitro,
  obtenerRotulosPorLote,
} from "../controllers/RegistroMPController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/", obtenerRegistros);
router.get("/:id/rotulos", obtenerRotulosPorLote);
router.post("/", crearRegistro);
router.put("/:id", actualizarRegistro);
router.delete("/:id", eliminarRegistro);

router.patch("/confirmar/:id", confirmarRegitro);

export default router;
