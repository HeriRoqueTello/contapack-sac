import { DataSource } from "typeorm";
import { Usuario } from "../models/Usuario";
import { Area } from "../models/Area";
import { Rol } from "../models/Rol";

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost', // Tu host de MySQL
  port: parseInt(process.env.DB_PORT || '3306', 10), // Tu puerto de MySQL
  username: process.env.DB_USER || 'root', // Tu usuario de MySQL
  password: process.env.DB_PASSWORD || 'password', // Tu contraseña de MySQL
  database: process.env.DB_NAME || 'nombre_de_tu_db', // Tu nombre de base de datos MySQL
  synchronize: false, // ¡Cuidado con esto en producción! Si es `true`, TypeORM intentará sincronizar el esquema de la base de datos con tus entidades, lo que puede causar pérdida de datos. Asume que tus tablas ya están creadas.
  logging: false, // Puedes cambiar a true para ver los logs de SQL
  entities: [Usuario, Area, Rol], // Aquí registras tus entidades (modelos)
  migrations: [],
  subscribers: [],
});

export const connectToDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log('Conexión a la base de datos MySQL establecida correctamente con TypeORM');
    return dataSource; // Devuelve la instancia del DataSource si es exitoso
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    // Aquí podrías relanzar el error o manejarlo de otra forma
    throw error;
  }
};