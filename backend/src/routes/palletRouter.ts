import { Router } from "express";
import { obtenerPallets } from "../controllers/PalletController";

const router = Router();

router.get("/", obtenerPallets);

export default router;
