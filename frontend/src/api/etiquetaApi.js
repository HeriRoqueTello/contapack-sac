import api from "@/config/axios";

// Obtener todas las etiquetas
export const getEtiquetas = async () => {
  const res = await api.get("/etiquetas");
  return res.data;
};

// Crear una nueva etiqueta
export const createEtiqueta = async (etiqueta) => {
  const res = await api.post("/etiquetas", etiqueta);
  return res.data;
};

// Actualizar una etiqueta existente
export const updateEtiqueta = async (id, etiqueta) => {
  const res = await api.put(`/etiquetas/${id}`, etiqueta);
  return res.data;
};

// Eliminar una etiqueta
export const deleteEtiqueta = async (id) => {
  const res = await api.delete(`/etiquetas/${id}`);
  return res.data;
};

// Confirmar una etiqueta (cambiar estado a "Confirmado")
export const confirmarEtiqueta = async (id) => {
  const res = await api.patch(`/etiquetas/confirmar/${id}`);
  return res.data;
};
