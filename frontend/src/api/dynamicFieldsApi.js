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
    transporteDescargaRes,
    choferesRes,
    calibresRes,
    categoriasRes,
  ] = await Promise.all([
    api.get("/productores"),
    api.get("/registroMP"),
    api.get("/exportadores"),
    api.get("/productos"),
    api.get("/variedades"),
    api.get("/guiaProducto"),
    api.get("/responsables"),
    api.get("/transporteDescarga"),
    api.get("/choferes"),
    api.get("/calibres"),
    api.get("/categorias"),
  ]);

  // console.log("Datos dinámicos recibidos:");
  // console.log({
  //   productores: productoresRes.data,
  //   registrosMP: registrosMPRes.data,
  //   exportadores: exportadoresRes.data,
  //   productos: productosRes.data,
  //   variedades: variedadesRes.data,
  //   guiaProductor: guiaProductorRes.data,
  //   responsables: responsablesRes.data,
  //   transporteDescarga: transporteDescargaRes.data,
  //   choferes: choferesRes.data,
  // });

  return {
    productores: productoresRes.data,
    registrosMP: registrosMPRes.data,
    exportadores: exportadoresRes.data,
    productos: productosRes.data,
    variedades: variedadesRes.data,
    guiaProductor: guiaProductorRes.data,
    responsables: responsablesRes.data,
    transporteDescarga: transporteDescargaRes.data,
    choferes: choferesRes.data,
    calibres: calibresRes.data,
    categorias: categoriasRes.data,
  };
};
