import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config()

export const db = new Sequelize(process.env.DB_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialect: 'mysql',
  dialectOptions: {
    // Si la URL ya incluye `ssl-mode=REQUIRED`, esta configuración a veces es redundante.
    // Pero puedes dejarla para asegurar la conexión SSL.
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})