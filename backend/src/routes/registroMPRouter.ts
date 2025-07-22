import { Router } from "express";
import {
  crearRegistro,
  obtenerRegistros,
  actualizarRegistro,
  eliminarRegistro,
} from "../controllers/RegistroMPController";

const router = Router();

router.get("/registro-materia-prima", obtenerRegistros);
router.post("/registro-materia-prima", crearRegistro);
router.put("/registro-materia-prima/:id", actualizarRegistro);
router.delete("/registro-materia-prima", eliminarRegistro);

export default router;
