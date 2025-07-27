export const fields = [
  // Dirección de referencia del lote
  {
    name: "dirReferencia",
    label: "Dirección de referencia",
    type: "text",
    required: true,
  },

  // Placas del vehículo
  { name: "placa", label: "Placa", type: "text", required: true },
  { name: "placa2", label: "Placa2", type: "text", required: false },

  // Hora en que se realiza la descarga
  {
    name: "horaDescarga",
    label: "Hora de descarga",
    type: "datetime-local",
    required: true,
  },

  // Código interno del lote
  {
    name: "codNumero",
    label: "Código de número",
    type: "text",
    required: true,
  },

  // Campaña agrícola
  {
    name: "campaña",
    label: "Campaña",
    type: "text",
    required: true,
  },

  // Selector de exportador con su código visible
  {
    name: "exportadorId",
    label: "Exportador",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.exportadores)
        ? dynamic.exportadores.map((e) => ({
            label: `${e.nombreEmpresa} (${e.codigo})`, // muestra nombre + código
            value: e.id,
          }))
        : [],
  },

  // Número de semana del lote
  {
    name: "numSemana",
    label: "Número de semana",
    type: "text",
    required: true,
  },

  // Orden de volcado (si aplica)
  {
    name: "ordenVolcado",
    label: "Orden de volcado",
    type: "text",
    required: false,
  },

  // Fecha de recepción del lote
  {
    name: "fecha",
    label: "Fecha de recepción",
    type: "date",
    required: true,
  },

  // Fecha de la guía de transporte
  {
    name: "fechaGuia",
    label: "Fecha de guía",
    type: "date",
    required: false,
  },

  // Guías asociadas al lote
  {
    name: "guiaProductor",
    label: "Guía Productor",
    type: "text",
    required: true,
  },
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
  },

  // Glosa o descripción adicional
  {
    name: "glosa",
    label: "Glosa",
    type: "text",
    required: true,
  },

  // Selector de productor con CLP y código visibles
  {
    name: "productorId",
    label: "Productor/Proveedor",
    type: "select",
    required: true,
    options: ({ dynamic }) =>
      Array.isArray(dynamic?.productores)
        ? dynamic.productores.map((p) => ({
            label: `${p.nombre} (${p.clp}) (${p.codigo})`, // muestra nombre + CLP + código
            value: p.id,
          }))
        : [],
  },

  // Número de ingreso del lote
  {
    name: "numIngreso",
    label: "Número de ingreso",
    type: "text",
    required: true,
  },

  // CLP del productor
  { name: "clp", label: "CLP", type: "text", required: true },

  // Pesos y cantidades
  { name: "pesoNeto", label: "Peso neto", type: "text", required: true },
  {
    name: "cantJabas",
    label: "Cantidad de jabas",
    type: "text",
    required: true,
  },
  {
    name: "pesoDescuento",
    label: "Peso descuento",
    type: "text",
    required: false,
  },
  {
    name: "pesoGuia",
    label: "Peso según Guía",
    type: "text",
    required: true,
  },
  {
    name: "difPeso",
    label: "Diferencia de peso",
    type: "text",
    required: true,
  },

  // Responsable del lote
  {
    name: "responsable",
    label: "Responsable",
    type: "text",
    required: true,
  },

  // Información del transporte
  {
    name: "empTransportes",
    label: "Empresa de Transporte",
    type: "text",
    required: true,
  },
  { name: "chofer", label: "Chofer", type: "text", required: true },
  {
    name: "licConducir",
    label: "Licencia de conducir",
    type: "text",
    required: true,
  },

  // Observaciones y detalles adicionales
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
