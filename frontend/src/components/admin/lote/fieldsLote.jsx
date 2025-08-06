export const fields = [
  // --- Identificación del lote ---
  {
    name: "productorId",
    label: "Productor/Proveedor",
    type: "combo",
    required: true,
    options: ({ dynamic }) => {
      //Si productores no es un array retorna vacío
      if (!Array.isArray(dynamic?.productores)) return [];
      //Guarda nombres unicos de los productores
      const nombresUnicos = new Set();
      //Filtrar los nombres para obtener solo los que no se repiten
      const productoresFiltrados = dynamic.productores.filter((p) => {
        if (nombresUnicos.has(p.nombre)) return false;
        nombresUnicos.add(p.nombre);
        return true;
      });
      //Retorna los productores filtrados
      return productoresFiltrados.map((p) => ({
        label: p.nombre,
        value: p.id,
        clp: p.clp,
        codigo: p.codigo,
        guia: p.guiaProductor,
        responsable: p.responsable,
        lugar: p.lugReferencia,
        fechaGuia: p.fechaGuia,
      }));
    },

    onChange: ({ value, dynamic, setValue }) => {
      const productor = dynamic.productores?.find((p) => p.id === value);

      //Si el productor existe en la BD
      if (productor) {
        setValue("clp", productor.clp);
        setValue("lugReferencia", productor.lugReferencia);
        setValue("guiaProductor", productor?.guias?.[0]?.guiaProductor);
        setValue("responsable", productor.responsables?.[0]?.nombre);
        setValue("codigo", productor.codigo);
        setValue("fechaGuia", productor?.guias?.[0]?.fechaGuia);
      }
      //Si el productor no existe en la BD
      else {
        setValue("clp", "");
        setValue("codigo", "");
        setValue("guiaProductor", "");
        setValue("responsable", "");
        setValue("lugReferencia", "");
        setValue("fechaGuia", "");
      }
    },
  },
  {
    name: "clp",
    label: "CLP",
    type: "text",
    required: true,
  },
  {
    name: "lugReferencia",
    label: "Lugar de referencia",
    type: "text",
    required: true,
  },
  {
    name: "codigo",
    label: "Código",
    type: "text",
    required: true,
  },
  {
    name: "guiaProductorId",
    label: "Guia de Productor",
    type: "combo",
    required: true,
    options: ({ dynamic, watch }) => {
      //Verifica que dynamic.productores sea un array
      if (!Array.isArray(dynamic?.productores)) return [];
      //Busca el id del productor Seleccionado
      const selectedProductorId = watch("productorId");
      //Busca el objeto productopr con ese Id
      const productor = dynamic.productores.find(
        (p) => p.id === selectedProductorId
      );
      //Busca las guias relacionadas en ese objeto productor encontrado
      const guiasDelProductor = productor?.guias ?? [];
      //Retorna la lista de guias por productor seleccionado
      return guiasDelProductor.map((g) => ({
        label: g.guiaProductor,
        value: g.id,
      }));
    },
  },
  {
    name: "fechaGuia",
    label: "Fecha de guía",
    type: "text",
    required: false,
  },
  {
    name: "responsable",
    label: "Responsable",
    type: "text",
    required: true,
  },
  {
    name: "exportadorId",
    label: "Exportador",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.exportadores)
        ? dynamic.exportadores.map((e) => ({
            label: `${e.nombreEmpresa} (${e.codigo})`,
            value: e.id,
            codigo: e.codigo,
          }))
        : [],
  },
  {
    name: "numIngreso",
    label: "Número de ingreso",
    type: "text",
    required: true,
  },
  // --- Fechas principales ---
  {
    name: "fecha",
    label: "Fecha de recepción",
    type: "date",
    required: true,
  },
  {
    name: "horaDescarga",
    label: "Hora de descarga",
    type: "datetime-local",
    required: true,
  },
  // --- Transporte ---
  {
    name: "empTransportes",
    label: "Empresa de Transporte",
    type: "combo",
    required: true,
    options: ({ dynamic }) => {
      //Recorre la lista de empresas de transporte
      const empresas = Array.isArray(dynamic?.transporteDescarga)
        ? dynamic.transporteDescarga
        : [];

      return empresas.map((t) => ({
        label: `${t.empresaTransporte} - ${t.guiaTransportista}`,
        value: t.id,
        guia: t.guiaTransportista,
      }));
    },

    onChange: ({ value, dynamic, setValue }) => {
      const transporte = dynamic.transporteDescarga?.find(
        (t) => t.id === value
      );
      if (transporte) {
        setValue("guiaTransportista", transporte.guiaTransportista ?? "");
      } else {
        setValue("guiaTransportista", "");
      }
    },
  },
  {
    name: "guiaTransportista",
    label: "Guía Transportista",
    type: "text",
    required: true,
  },
  {
    name: "chofer",
    label: "Chofer",
    type: "combo",
    required: true,
    options: ({ dynamic }) => {
      return Array.isArray(dynamic?.choferes)
        ? dynamic.choferes.map((c) => ({
            label: c.nombre,
            value: c.id,
            licencia: c.licConducir,
          }))
        : [];
    },
    onChange: ({ value, dynamic, setValue }) => {
      const chofer = dynamic.choferes?.find((c) => c.id === value);
      //Si el chofer existe en la BD
      if (chofer) {
        setValue("licConducir", chofer.licencia);
      }
      //Si el chofer no existe en la BD
      else {
        setValue("licConducir", "");
      }
    },
  },
  {
    name: "licConducir",
    label: "Licencia de conducir",
    type: "text",
    required: true,
  },
  {
    name: "placa",
    label: "Placa",
    type: "text",
    required: true,
  },
  { name: "placa2", label: "Placa2", type: "text", required: false },

  // --- Guías asociadas ---
  {
    name: "guiaSENASA",
    label: "Guía SENASA",
    type: "text",
    required: false,
  },

  // --- Pesos y cantidades ---
  // {
  //   name: "pesoGuia",
  //   label: "Peso según Guía",
  //   type: "text",
  //   required: true,
  // },
  {
    name: "pesoDescuento",
    label: "Peso descuento",
    type: "text",
    required: false,
  },
  // --- Otros datos relevantes ---
  {
    name: "ordenVolcado",
    label: "Orden de volcado",
    type: "text",
    required: false,
  },
  {
    name: "glosa",
    label: "Glosa",
    type: "text",
    required: true,
  },
  {
    name: "obs",
    label: "Observaciones",
    type: "text",
    required: false,
  },
  {
    name: "descargado",
    label: "Operario de descarga",
    type: "text",
    required: false,
  },
  {
    name: "detServicio",
    label: "Detalle servicio",
    type: "text",
    required: false,
  },
];
