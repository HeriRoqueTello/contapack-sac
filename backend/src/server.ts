import colors from "colors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { db } from "./config/db";
import authRouter from "./routes/authRouter";
import { corsConfig } from "./config/cors";
import registroMPRouter from "./routes/registroMPRouter";
import rotuloRouter from "./routes/rotuloRouter";
import productorRouter from "./routes/productorRouter";
import exportadorRouter from "./routes/exportadorRouter";
import variedadRouter from "./routes/variedadRouter";
import productoRouter from "./routes/productoRouter";
import etiquetaRouter from "./routes/etiquetaRouter";
import responsableRouter from "./routes/responsableRouter";
import guiaProductorRouter from "./routes/guiaProductorRouter";
import transporteDescargaRouter from "./routes/transporteDescargaRouter";
import choferRouter from "./routes/choferRouter";
import produccionRouter from "./routes/produccionRouter";
import palletRouter from "./routes/palletRouter";
import empaqueRouter from "./routes/empaqueRouter";
import tipoEmpaqueRouter from "./routes/tipoEmpaqueRouter";

async function connectDB() {
  try {
    await db.authenticate();
    8;
    db.sync({});
    console.log(colors.blue.bold("Conexion existosa a la BD"));
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold("Fallo la conexion a la BD"));
  }
}

connectDB();

const app = express();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/registroMP", registroMPRouter);
app.use("/api/rotulos", rotuloRouter);
app.use("/api/productores", productorRouter);
app.use("/api/exportadores", exportadorRouter);
app.use("/api/variedades", variedadRouter);
app.use("/api/productos", productoRouter);
app.use("/api/etiquetas", etiquetaRouter);
app.use("/api/responsables", responsableRouter);
app.use("/api/guiaProducto", guiaProductorRouter);
app.use("/api/transporteDescarga", transporteDescargaRouter);
app.use("/api/choferes", choferRouter);
app.use("/api/produccion", produccionRouter);
app.use("/api/pallets", palletRouter);
app.use("/api/empaques", empaqueRouter);
app.use("/api/tipoEmpaques", tipoEmpaqueRouter);

export default app;
