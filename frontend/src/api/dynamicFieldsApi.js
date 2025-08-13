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
    palletsRes,
    empaquesRes,
    tipoEmpaquesRes,
    etiquetasRes,
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
    api.get("/pallets"),
    api.get("/empaques"),
    api.get("/tipoEmpaques"),
    api.get("/etiquetas")
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
    pallets: palletsRes.data,
    empaques: empaquesRes.data,
    tipoEmpaques: tipoEmpaquesRes.data,
    etiquetas: etiquetasRes.data,
  };
};
