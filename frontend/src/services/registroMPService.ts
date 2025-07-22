import api from "@/config/axios";
import axios from "axios";
import { data } from "react-router";

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
