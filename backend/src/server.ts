import colors from 'colors'
import express from 'express'
import cors from "cors";
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import { corsConfig } from "./config/cors";

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.blue.bold('Conexion existosa a la BD'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold('Fallo la conexion a la BD'))
  }
}

connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)

export default app