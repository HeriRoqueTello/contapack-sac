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
import categoriaRouter from "./routes/categoriaRouter";
import calibreRouter from "./routes/calibreRouter";
import productoRouter from "./routes/productoRouter";
import etiquetaRouter from "./routes/etiquetaRouter";

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
app.use("/api/categorias", categoriaRouter);
app.use("/api/calibres", calibreRouter);
app.use("/api/productos", productoRouter);
app.use("/api/etiquetas", etiquetaRouter);

export default app;
