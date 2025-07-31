export const fields = [
  // --- Identificación del lote ---
  {
    name: "productorId",
    label: "Productor/Proveedor",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.productores)
        ? dynamic.productores.map((p) => ({
            label: `${p.nombre} (${p.clp}) (${p.codigo})`,
            value: p.id,
          }))
        : [],
  },
  {
    name: "exportadorId",
    label: "Exportador",
    type: "select",
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
  {
    name: "fechaGuia",
    label: "Fecha de guía",
    type: "date",
    required: false,
  },
  // --- Guías asociadas ---
  {
    name: "guiaSenasa",
    label: "Guía SENASA",
    type: "text",
    required: false,
  },
  {
    name: "guiaTransportista",
    label: "Guía Transportista",
    type: "text",
    required: true,
    readOnly: true,
  },
  // --- Vehículo y transporte ---
  {
    name: "placa",
    label: "Placa",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.transporteDescarga)
        ? dynamic.transporteDescarga.map((t) => ({
            label: `${t.placa} - ${t.empresaTransporte} - ${
              t.chofer?.nombre ?? "Sin chofer"
            }`,
            value: t.placa,
          }))
        : [],
    onChange: ({ value, dynamic, setValue }) => {
      const transporte = dynamic.transporteDescarga?.find(
        (t) => t.placa === value
      );
      if (!transporte) return;

      setValue("empTransportes", transporte.empresaTransporte);
      setValue("chofer", transporte.chofer?.nombre ?? "");
      setValue("licConducir", transporte.chofer?.licencia ?? "");
      setValue("guiaTransportista", transporte.guiaTransportista ?? "");
    },
  },
  { name: "placa2", label: "Placa2", type: "text", required: false },
  {
    name: "empTransportes",
    label: "Empresa de Transporte",
    type: "text",
    required: true,
    readOnly: true,
  },
  { name: "chofer", label: "Chofer", type: "text", required: true },
  {
    name: "licConducir",
    label: "Licencia de conducir",
    type: "text",
    required: true,
    readOnly: true,
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
    name: "lugReferencia",
    label: "Lugar de referencia",
    type: "text",
    required: true,
  },
  {
    name: "glosa",
    label: "Glosa",
    type: "text",
    required: true,
  },
  {
    name: "responsable",
    label: "Responsable",
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
