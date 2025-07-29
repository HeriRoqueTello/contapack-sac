import api from "@/config/axios";

export const fetchDynamicFields = async () => {
  const [
    productoresRes,
    registrosMPRes,
    exportadoresRes,
    productosRes,
    variedadesRes,
    guiaProductorRes,
    responsablesRes,
    Re,
  ] = await Promise.all([
    api.get("/productores"),
    api.get("/registroMP"),
    api.get("/exportadores"),
    api.get("/productos"),
    api.get("/variedades"),
    api.get("/guiaProducto"),
    api.get("/responsables"),
  ]);

  return {
    productores: productoresRes.data,
    registrosMP: registrosMPRes.data,
    exportadores: exportadoresRes.data,
    productos: productosRes.data,
    variedades: variedadesRes.data,
    guiaProductor: guiaProductorRes.data,
    responsables: responsablesRes.data,
  };
};
