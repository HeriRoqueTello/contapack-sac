import api from "@/config/axios";


export const getRegistroMP = async () => {
  const res = await api.get("/registroMP");
  return res.data;
}

export const createRegistroMP = async (registro) => {
  const res = await api.post("/registroMP", registro);
  return res.data;
}

export const updateRegistroMP = async (id, registro) => {
  const res = await api.patch(`/registroMP/${id}`, registro);
  return res.data;
} 

export const deleteRegistroMP = async (id) => {
  const res = await api.delete(`/registroMP/${id}`);
  return res.data;
}

export const confirmarRegistroMP = async (id) => {
  const res = await api.patch(`/registroMP/confirmar/${id}`);
  return res.data;
}