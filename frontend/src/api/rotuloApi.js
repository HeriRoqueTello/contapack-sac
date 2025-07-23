import api from "@/config/axios";

export const getRotulos = async () => {
  const res = await api.get("/rotulos");
  return res.data;
};

export const createRotulo = async (rotulo) => {
  const res = await api.post("/rotulos", rotulo);
  return res.data;
};

export const updateRotulo = async (id, rotulo) => {
  const res = await api.put(`/rotulos/${id}`, rotulo);
  return res.data;
};

export const deleteRotulo = async (id) => {
  const res = await api.delete(`/rotulos/${id}`);
  return res.data;
};

export const confirmarRotulo = async (id) => {
  const res = await api.patch(`/rotulos/confirmar/${id}`);
  return res.data;
};
