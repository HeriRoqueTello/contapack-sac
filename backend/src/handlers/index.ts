// src/controllers/authController.ts (o donde tengas estas funciones)
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import { Usuario } from "../models/Usuario";
import { dataSource } from "../config/db";

// Importa tu DataSource y la entidad Usuario


// Obtén el repositorio de Usuario
const userRepository = dataSource.getRepository(Usuario);

// Extiende la interfaz Request de Express para incluir 'user'
declare global {
  namespace Express {
    interface Request {
      user?: Usuario; // 'user' será una instancia de tu entidad Usuario
    }
  }
}

export const createAccount = async (req: Request, res: Response) => {
  try {
    // Obtenemos solo las propiedades que coinciden con tu tabla y 'password'
    const { Nombres, Apellido, Telefono, Email, password } = req.body;

    // 1. Verificar si el Email ya existe
    const userExistsByEmail = await userRepository.findOne({ where: { Email: Email } });
    if (userExistsByEmail) {
      const error = new Error('Este Email ya está registrado con otro usuario');
      res.status(409).json({ error: error.message });
      return
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear una nueva instancia de Usuario con los datos de la tabla + password
    const newUser = userRepository.create({
      Nombres,
      Apellido,
      Telefono,
      Email, // Asegúrate de que el nombre de la propiedad aquí sea el mismo que en tu entidad
      Estado: true, // Asumiendo un estado por defecto si no se provee
      password: hashedPassword // La nueva columna de contraseña
      // IdRol e IdArea no se setean aquí si se asume que se asignan después o son opcionales
    });

    // Guardar el nuevo usuario en la base de datos
    await userRepository.save(newUser);

    res.status(201).send("Usuario registrado correctamente");

  } catch (err: any) {
    console.error("Error en createAccount:", err); // Log para depuración
    res.status(500).json({ error: `Error: ${err.message || 'Error desconocido'}` });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { Email, password } = req.body; // Asegúrate de usar Email para que coincida con la tabla

    // Buscar usuario por Email
    const user = await userRepository.findOne({ where: { Email: Email } });

    if (!user) {
      const error = new Error('No existe un usuario registrado con este Email');
      res.status(401).json({ error: error.message });
      return
    }

    // Comprobar la contraseña
    const isPasswordValid = await checkPassword(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Contraseña incorrecta');
      res.status(401).json({ error: error.message });
      return
    }

    // Generar JWT usando IdUsuario (la clave primaria de tu tabla)
    const token = generateJWT({ id: user.IdUsuario });

    res.send(token);

  } catch (err: any) {
    console.error("Error en login:", err); // Log para depuración
    res.status(500).json({ error: `Error: ${err.message || 'Error desconocido'}` });
  }
};

export const getUser = async (req: Request, res: Response) => {
  // req.user debería ser una instancia de la entidad Usuario ya cargada por tu middleware de autenticación
  if (!req.user) {
    res.status(401).json({ error: 'Usuario no autenticado o no encontrado.' });
    return
  }
  // Si necesitas asegurarte de que el usuario está completo o refrescar sus datos de la DB
  const foundUser = await userRepository.findOne({ where: { IdUsuario: req.user.IdUsuario } });
  if (!foundUser) {
    res.status(404).json({ error: 'Usuario no encontrado.' });
    return
  }
  // Devuelve el usuario encontrado, excluyendo la contraseña
  const { password, ...userWithoutPassword } = foundUser;
  res.json(userWithoutPassword);
};

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     // Solo consideraremos las propiedades que están en tu tabla (Nombres, Apellido, Telefono, Email, Estado, IdRol, IdArea)
//     const { Nombres, Apellido, Telefono, Email, Estado, IdRol, IdArea } = req.body;

//     // Asegúrate de que req.user existe y es una instancia de tu entidad Usuario
//     if (!req.user || !req.user.IdUsuario) {
//       return res.status(401).json({ error: 'Usuario no autenticado o ID de usuario no disponible.' });
//     }

//     // Cargar el usuario desde la base de datos para asegurar que estamos modificando una entidad manejada por TypeORM
//     const userToUpdate = await userRepository.findOne({ where: { IdUsuario: req.user.IdUsuario } });

//     if (!userToUpdate) {
//       return res.status(404).json({ error: 'Usuario a actualizar no encontrado en la base de datos.' });
//     }

//     // Si el Email se va a cambiar, verificar unicidad
//     if (Email && Email !== userToUpdate.Email) {
//       const userExistsByEmail = await userRepository.findOne({ where: { Email: Email } });
//       if (userExistsByEmail) {
//         const error = new Error('Este Email ya está registrado con otro usuario.');
//         return res.status(409).json({ error: error.message });
//       }
//     }

//     // Actualizar las propiedades del usuario si están presentes en el body
//     if (Nombres !== undefined) userToUpdate.Nombres = Nombres;
//     if (Apellido !== undefined) userToUpdate.Apellido = Apellido;
//     if (Telefono !== undefined) userToUpdate.Telefono = Telefono;
//     if (Email !== undefined) userToUpdate.Email = EMail;
//     if (Estado !== undefined) userToUpdate.Estado = Estado;
//     if (IdRol !== undefined) {
//       // Si IdRol viene en el body, se asigna directamente
//       userToUpdate.IdRol = IdRol;
//       // Si necesitas cargar el objeto Rol completo:
//       // const rol = await AppDataSource.getRepository(Rol).findOne({ where: { IdRol: IdRol } });
//       // if (rol) userToUpdate.rol = rol;
//     }
//     if (IdArea !== undefined) {
//       // Si IdArea viene en el body, se asigna directamente
//       userToUpdate.IdArea = IdArea;
//       // Si necesitas cargar el objeto Area completo:
//       // const area = await AppDataSource.getRepository(Area).findOne({ where: { IdArea: IdArea } });
//       // if (area) userToUpdate.area = area;
//     }


//     await userRepository.save(userToUpdate); // Guardar la entidad actualizada

//     res.send('Perfil Actualizado Correctamente');

//   } catch (e: any) {
//     console.error("Error en updateProfile:", e); // Log para depuración
//     const error = new Error("Hubo un error al actualizar el perfil");
//     res.status(500).json({ error: error.message || 'Error desconocido' });
//   }
// };