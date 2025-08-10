import { Router } from "express";
import {
  obtenerEtiqueta,  
  crearEtiqueta,
  actualizarEtiqueta,
  eliminarEtiqueta,
  confirmarEtiqueta,
  getDynamicData, 
} from "../controllers/etiquetaController";

import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

// Rutas
router.get("/dynamic-data", getDynamicData);
router.get("/", obtenerEtiqueta);
router.post("/", crearEtiqueta);
router.put("/:id", actualizarEtiqueta);
router.delete("/:id", eliminarEtiqueta);
router.patch("/confirmar/:id", confirmarEtiqueta);



export default router;
