import api from "@/config/axios";

export const getProduccion = async () => {
  const res = await api.get("/produccion");
  return res.data;
};

export const createProduccion = async (produccion) => {
  const res = await api.post("/produccion", produccion);
  return res.data;
};

export const updateProduccion = async (id, produccion) => {
  const res = await api.put(`/produccion/${id}`, produccion);
  return res.data;
};

export const deleteProduccion = async (id) => {
  const res = await api.delete(`/produccion/${id}`);
  return res.data;
};

export const confirmarProduccion = async(id) =>{
  const res = await api.patch(`/produccion/confirmar/${id}`);
  return res.data;
}
