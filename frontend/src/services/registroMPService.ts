import axios from "axios";
import { data } from "react-router";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//Obtener todos los registros
export const obtenerRegistroMP = async () => {
  const respuesta = await api.get("/registro-materia-prima");
  return respuesta.data;
};

//Crear un nuevo registro
export const crearRegistroMP = async (data) => {
  const respuesta = await api.post("/registro-materia-prima", data);
  return respuesta.data;
};

//Actualizar un registro por ID
export const actualizarRegistroMP = async (id, data) => {
  const respuesta = await api.put(`/registro-materia-prima/${id}`, data);
  return respuesta.data;
};

//Eliminar un registro por ID
export const eliminarRegistroMP = async (id) => {
  const respuesta = await api.delete(`/registro-materia-prima/${id}`);
  return respuesta.data;
};
