import { Router } from "express";
import {
  crearRegistro,
  obtenerRegistros,
  actualizarRegistro,
  eliminarRegistro,
  confirmarRegitro,
} from "../controllers/RegistroMPController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate)
router.get("/", obtenerRegistros);
router.post("/", crearRegistro);
router.put("/:id", actualizarRegistro);
router.delete("/:id", eliminarRegistro);

router.patch("/confirmar/:id", confirmarRegitro);

export default router;
