import api from "@/config/axios";

export const fetchDynamicFields = async () => {
  const [
    productoresRes,
    registrosMPRes,
    exportadoresRes,
    productosRes,
    calibreRes,
    categoriaRes,
    variedadesRes,
    guiaProductorRes,
    responsablesRes,
    transporteDescargaRes,
    choferesRes,
    palletsRes,
    empaquesRes,
    tipoEmpaquesRes,
  ] = await Promise.all([
    api.get("/productores"),
    api.get("/registroMP"),
    api.get("/exportadores"),
    api.get("/productos"),
    api.get("/calibres"),
    api.get("/categorias"),
    api.get("/variedades"),
    api.get("/guiaProducto"),
    api.get("/responsables"),
    api.get("/transporteDescarga"),
    api.get("/choferes"),
    api.get("/pallets"),
    api.get("/empaques"),
    api.get("/tipoEmpaques"),
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
    calibres: calibreRes.data,
    categorias: categoriaRes.data,
    variedades: variedadesRes.data,
    guiaProductor: guiaProductorRes.data,
    responsables: responsablesRes.data,
    transporteDescarga: transporteDescargaRes.data,
    choferes: choferesRes.data,
    pallets: palletsRes.data,
    empaques: empaquesRes.data,
    tipoEmpaques: tipoEmpaquesRes.data,
  };
};
