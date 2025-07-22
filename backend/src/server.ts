import colors from "colors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { db } from "./config/db";
import authRouter from "./routes/authRouter";
import { corsConfig } from "./config/cors";
import registroMPRouter from "./routes/registroMPRouter";
import rotuloRouter from "./routes/rotuloRouter";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync({alter: true});
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

app.use("/api", registroMPRouter);
app.use("/api", rotuloRouter);

export default app;
