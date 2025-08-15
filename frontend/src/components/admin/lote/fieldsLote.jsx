export const fields = [
  {
    type: "sectionTitle",
    label: "Identificación del Lote",
  },
  {
    name: "productorId",
    label: "Productor / Proveedor",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.productores)
        ? dynamic.productores.map((p) => ({
            label: `${p.nombre} (${p.codigo})`,
            value: p.id,
          }))
        : [],
    onChange: ({ value, dynamic, setValue }) => {
      const productor = dynamic.productores?.find((p) => p.id === value);
      setValue("clp", productor?.clp ?? "");
      setValue("lugReferencia", productor?.lugReferencia ?? "");
      setValue("codigo", productor?.codigo ?? "");
      setValue("guiaProductorId", null);
      setValue("fechaGuia", "");
      setValue("pesoGuia", 0);
      setValue("responsableId", null);
    },
  },
  {
    name: "clp",
    label: "CLP",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    name: "lugReferencia",
    label: "Lugar de Referencia",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    name: "codigo",
    label: "Código de Productor",
    type: "text",
    required: true,
    disabled: true,
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
          }))
        : [],
  },
  {
    name: "numIngreso",
    label: "Número de Ingreso",
    type: "text",
    required: true,
  },

  {
    type: "sectionTitle",
    label: "Guías y Responsables",
  },
  {
    name: "guiaProductorId",
    label: "Guía de Productor",
    type: "combo", // El tipo 'combo' ya permite crear nuevas entradas
    required: true,
    options: ({ dynamic, watch }) => {
      const selectedProductorId = watch("productorId");
      if (!selectedProductorId || !Array.isArray(dynamic?.guiaProductor)) {
        return [];
      }
      return dynamic.guiaProductor
        .filter((g) => g.productorId === selectedProductorId)
        .map((g) => ({
          label: g.guiaProductor,
          value: g.id,
        }));
    },
    onChange: ({ value, setValue, dynamic }) => {
      // Si el valor no es un número, es una guía nueva. Reseteamos los campos.
      if (typeof value !== "number") {
        setValue("fechaGuia", "");
        setValue("pesoGuia", ""); // Dejar en blanco para que el usuario lo llene
        return;
      }

      const guia = dynamic.guiaProductor.find((g) => g.id === value);
      const fechaFormateada = guia?.fechaGuia
        ? new Date(guia.fechaGuia).toISOString().split("T")[0]
        : "";

      setValue("fechaGuia", fechaFormateada);
      setValue("pesoGuia", guia?.pesoGuia ?? "");
    },
  },
  {
    name: "fechaGuia",
    label: "Fecha de Guía",
    type: "date",
    required: true,
    disabled: true,
  },
  {
    name: "pesoGuia",
    label: "Peso de Guía (Kg)",
    type: "text",
    required: true,
  },
  {
    name: "responsableId",
    label: "Responsable",
    type: "combo",
    required: true,
    options: ({ dynamic, watch }) => {
      const selectedProductorId = watch("productorId");
      if (!selectedProductorId) return [];
      const productor = dynamic.productores?.find(
        (p) => p.id === selectedProductorId
      );
      return (
        productor?.responsables?.map((r) => ({
          label: r.nombre,
          value: r.id,
        })) ?? []
      );
    },
  },
  {
    name: "guiaSENASA",
    label: "Guía SENASA",
    type: "text",
    required: false,
  },

  {
    type: "sectionTitle",
    label: "Fechas de Recepción",
  },
  {
    name: "fecha",
    label: "Fecha de Recepción",
    type: "date",
    required: true,
  },
  {
    name: "horaDescarga",
    label: "Hora de Descarga",
    type: "datetime-local",
    required: true,
  },

  {
    type: "sectionTitle",
    label: "Información del Transporte",
  },
  {
    name: "empresaTransporte",
    label: "Empresa de Transporte",
    type: "text",
    required: true,
  },
  {
    name: "guiaTransportista",
    label: "Guía Transportista",
    type: "text",
    required: true,
  },
  {
    name: "choferId",
    label: "Chofer",
    type: "combo",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.choferes)
        ? dynamic.choferes.map((c) => ({
            label: c.nombre,
            value: c.id,
            licencia: c.licencia,
          }))
        : [],
    // --- CORRECCIÓN AQUÍ ---
    onChange: ({ value, setValue, dynamic }) => {
      const chofer = dynamic.choferes?.find((c) => c.id === value);
      setValue("licencia", chofer?.licencia ?? "");
    },
  },
  {
    name: "licencia",
    label: "Licencia de Conducir",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    name: "placa",
    label: "Placa",
    type: "text",
    required: true,
  },
  {
    name: "placa2",
    label: "Placa 2 (Opcional)",
    type: "text",
    required: false,
  },

  {
    type: "sectionTitle",
    label: "Pesos, Cantidades y Otros",
  },
  {
    name: "pesoDescuento",
    label: "Peso Descuento (Kg)",
    type: "text",
    required: false,
  },
  {
    name: "ordenVolcado",
    label: "Orden de Volcado",
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
    label: "Operario de Descarga",
    type: "text",
    required: false,
  },
  {
    name: "detServicio",
    label: "Detalle de Servicio",
    type: "text",
    required: false,
  },
];
