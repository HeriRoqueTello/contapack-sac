import api from "@/config/axios";
import axios from "axios";

//Obtener todos los rotulos
export const obtenerRotulo = async () => {
  const respuesta = await api.get("/rotulo");
  return respuesta.data;
};

//Crear un nuevo rotulo
export const crearRotulo = async (data) => {
  const respuesta = await api.post("/rotulo", data);
  return respuesta.data;
};

//Actualizar un rotulo por ID
export const actualizarRotulo = async (id, data) => {
  const respuesta = await api.put(`/rotulo/${id}`, data);
  return respuesta.data;
};

//Eliminar un rotulo por ID
export const eliminarRotulo = async (id) => {
  const respuesta = await api.delete(`/rotulo/${id}`);
  return respuesta.data;
};

//Confirmar rotulo
export const confirmarRotulo = async (id) => {
  const respuesta = await api.patch(`/rotulo/confirmar/${id}`);
  return respuesta.data;
};
