import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { fields } from "@/components/admin/recepcion/Lote/fieldsLote";
import { columnsLote } from "@/components/admin/recepcion/Lote/columnsLote";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmarRegistroMP,
  createRegistroMP,
  deleteRegistroMP,
  getRegistroMP,
  updateRegistroMP,
} from "@/api/registroMPApi";
import { fetchDynamicFields } from "@/api/dynamicFieldsApi";
import { getRotulos } from "@/api/rotuloApi";

export function LoteView() {
  const queryCliente = useQueryClient();
  const [dynamicFields, setDynamicFields] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  useEffect(() => {
    const cargarCampos = async () => {
      const data = await fetchDynamicFields();
      setDynamicFields(data);
    };
    cargarCampos();
  }, []);

  const {
    isLoading: isLoadingLote,
    data: dataLote,
    isError: isErrorLote,
    error: errorLote,
  } = useQuery({
    queryKey: ["lotes"],
    queryFn: getRegistroMP,
  });

  const {
    isLoading: isLoadingRotulo,
    data: dataRotulo,
    isError: isErrorRotulo,
    error: errorRotulo,
  } = useQuery({
    queryKey: ["rotulos"],
    queryFn: getRotulos,
  });

  const deleteRegistroMPMutation = useMutation({
    mutationFn: deleteRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  const updateRegistroMPMutation = useMutation({
    mutationFn: ({ id, datos }) => updateRegistroMP(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  const addRegistroMPMutation = useMutation({
    mutationFn: createRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  const confirmarRegistroMPMutation = useMutation({
    mutationFn: confirmarRegistroMP,
    onSuccess: () => {
      queryCliente.invalidateQueries(["lotes"]);
    },
  });

  function getISOWeekNumber(dateString) {
    const date = new Date(dateString);
    const dayNr = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - dayNr + 3);
    const firstThursday = new Date(date.getFullYear(), 0, 4);
    const diff = date - firstThursday;
    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
  }
  function normalizarRegistro(registro, dynamicFields) {
    console.log("registro completo:", registro);
    // Buscar relaciones desde el lote o desde los datos dinámicos
    const productor =
      registro.Productor ||
      dynamicFields.productores?.find(
        (p) => p.id === Number(registro.productorId)
      ) ||
      {};
    const exportador =
      registro.Exportador ||
      dynamicFields.exportadores?.find(
        (e) => e.id === Number(registro.exportadorId)
      ) ||
      {};
    const responsable =
      registro.Responsable ||
      dynamicFields.responsables?.find(
        (r) => r.id === Number(registro.responsableId)
      ) ||
      {};

    // Buscar guía del productor
    const guia =
      productor.Gui ||
      dynamicFields.guiaProductor?.find(
        (g) => g.productorId === Number(productor.id)
      ) ||
      {};

    // console.log("registro.transporteDescarga:", registro.transporteDescarga);
    // console.log(
    //   "registro.transporteDescargaId:",
    //   registro.transporteDescargaId
    // );
    // console.log(
    //   "dynamicFields.transporteDescarga:",
    //   dynamicFields.transporteDescarga
    // );
    // Buscar transporte del lote
    const transporte =
      registro.transporteDescargas?.[0] ||
      dynamicFields.transporteDescarga?.find(
        (t) => t.id === Number(registro.transporteDescargaId)
      ) ||
      {};

    console.log("tranporte", transporte);

    return {
      ...registro,
      // IDs normalizados
      productorId: registro.productorId ?? productor.id ?? null,
      exportadorId: registro.exportadorId ?? exportador.id ?? null,
      responsableId:
        registro.responsableId ??
        registro.Productor?.responsables?.[0]?.id ??
        responsable.id ??
        null,
      transporteDescargaId: transporte.id ?? null,

      // Campos derivados
      lugReferencia:
        registro.lugReferencia ?? productor.lugReferencia ?? "Sin Referencia",
      guiaProductor: registro.guiaProductor ?? guia.guiaProductor ?? "Sin Guía",
      pesoGuia: registro.pesoGuia ?? guia.pesoGuia ?? 0.0,
      responsable:
        registro.responsable ?? responsable.nombre ?? "Sin Responsable lote",

      // Campos del transporte (solo si decides duplicarlos)
      placa: registro.placaTransporte ?? transporte.placa ?? "Sin Placa",
      placa2: registro.placa2Transporte ?? transporte.placa2 ?? "Sin Placa",
      empTransportes:
        registro.empTransporte ?? transporte.empresaTransporte ?? "Sin Empresa",
      guiaTransportista:
        registro.guiaTransportista ??
        transporte.guiaTransportista ??
        "Sin Guía Transportista",
    };
  }

  const handleAdd = (nuevoRegistro) => {
    // Buscar productor y exportador seleccionados por ID
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(nuevoRegistro.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(nuevoRegistro.exportadorId)
    );

    // Validar que ambos existan
    if (!productor || !exportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    // Construir códigos únicos para el registro
    const codigoProductor = productor.codigo ?? "";
    const codigoExportador = exportador.codigo ?? "";
    nuevoRegistro.codigo = `${codigoProductor}${codigoExportador}`;
    nuevoRegistro.codNumero = `${nuevoRegistro.codigo}-${nuevoRegistro.numIngreso}`;

    // Asignar datos del productor
    nuevoRegistro.clp = productor.clp ?? "";
    nuevoRegistro.lugReferencia =
      productor.lugReferencia ?? "Sin Referencia lote";

    // Calcular semana ISO y campaña según la fecha de ingreso
    nuevoRegistro.numSemana = getISOWeekNumber(nuevoRegistro.fecha);
    nuevoRegistro.campaña = new Date(nuevoRegistro.fecha).getFullYear();

    // Buscar guía del productor asociada al productor seleccionado
    const guia = dynamicFields.guiaProductor?.find(
      (g) => g.productorId === Number(nuevoRegistro.productorId)
    );
    nuevoRegistro.guiaProductor = guia?.guiaProductor ?? "Sin Guía";
    nuevoRegistro.pesoGuia = guia?.pesoGuia ?? 0.0;

    // Buscar responsable del lote por ID
    const responsable = dynamicFields.responsables?.find(
      (r) => r.id === Number(nuevoRegistro.responsableId)
    );
    nuevoRegistro.responsable = responsable?.nombre ?? "Sin Responsable lote";

    // Buscar transporte seleccionado por ID
    const transporte = dynamicFields.transporteDescarga?.find(
      (t) => t.id === Number(nuevoRegistro.transporteDescargaId)
    );

    // Guardar solo la referencia al transporte, no sus atributos duplicados
    nuevoRegistro.transporteDescargaId = transporte?.id;

    // Inicializar valores numéricos por defecto
    nuevoRegistro.pesoNeto = "0.00";
    nuevoRegistro.cantJabas = 0;

    // Calcular diferencia de peso entre guía y peso neto
    const pesoGuia = Number(nuevoRegistro.pesoGuia);
    const pesoNeto = Number(nuevoRegistro.pesoNeto);
    nuevoRegistro.difPeso = (pesoGuia - pesoNeto).toFixed(2);

    // Enviar el registro completo al backend para su persistencia
    addRegistroMPMutation.mutate(nuevoRegistro);

    // Cerrar el diálogo de ingreso tras guardar
    setDialogOpen(false);
  };

  const handleUpdate = async (registroActualizado) => {
    // Buscar productor y exportador seleccionados por ID
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(registroActualizado.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(registroActualizado.exportadorId)
    );

    // Validar que ambos existan
    if (!productor || !exportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    // Construir códigos únicos para el registro
    const codigoProductor = productor.codigo ?? "";
    const codigoExportador = exportador.codigo ?? "";
    registroActualizado.codigo = `${codigoProductor}${codigoExportador}`;
    registroActualizado.codNumero = `${registroActualizado.codigo}-${registroActualizado.numIngreso}`;

    // Asignar datos del productor
    registroActualizado.clp = productor.clp ?? "";
    registroActualizado.lugReferencia =
      productor.lugReferencia ?? "Sin Referencia lote";

    // Calcular semana ISO y campaña según la fecha de ingreso
    registroActualizado.numSemana = getISOWeekNumber(registroActualizado.fecha);
    registroActualizado.campaña = new Date(
      registroActualizado.fecha
    ).getFullYear();

    // Buscar guía del productor asociada al productor seleccionado
    const guia = dynamicFields.guiaProductor?.find(
      (g) => g.productorId === Number(registroActualizado.productorId)
    );
    registroActualizado.guiaProductor = guia?.guiaProductor ?? "Sin Guía";
    registroActualizado.pesoGuia = guia?.pesoGuia ?? 0.0;

    // Calcular diferencia de peso entre guía y peso neto
    const pesoGuia = Number(registroActualizado.pesoGuia);
    const pesoNeto = Number(registroActualizado.pesoNeto);
    registroActualizado.difPeso = (pesoGuia - pesoNeto).toFixed(2);

    // Buscar responsable del lote por ID
    const responsable = dynamicFields.responsables?.find(
      (r) => r.id === Number(registroActualizado.responsableId)
    );
    registroActualizado.responsable =
      responsable?.nombre ?? "Sin Responsable lote";

    // Buscar transporte seleccionado por ID
    const transporte = dynamicFields.transporteDescarga?.find(
      (t) => t.id === Number(registroActualizado.transporteDescargaId)
    );

    // Guardar solo la referencia al transporte, no sus atributos duplicados
    registroActualizado.transporteDescargaId = transporte?.id;

    // Eliminar campos no persistentes o temporales
    const registroFinal = { ...registroActualizado };
    delete registroFinal.rotulos;

    // Enviar actualización al backend
    updateRegistroMPMutation.mutate({
      id: registroEditando.id,
      datos: registroFinal,
    });

    // Limpiar estado de edición y cerrar el diálogo
    setRegistroEditando(null);
    setDialogOpen(false);
  };

  const handleEliminar = async (id) => {
    deleteRegistroMPMutation.mutate(id);
  };

  const handleConfirmar = async (id) => {
    confirmarRegistroMPMutation.mutate(id);
  };

  if (isLoadingLote || isLoadingRotulo) return <div>Cargando datos...</div>;
  if (isErrorLote) return <div>Error al cargar lotes: {errorLote.message}</div>;
  if (isErrorRotulo)
    return <div>Error al cargar rótulos: {errorRotulo.message}</div>;

  return (
    <>
      <DialogDemo
        fields={fields}
        dynamic={dynamicFields}
        title="Registro de Lote"
        onSubmit={registroEditando ? handleUpdate : handleAdd}
        initialData={registroEditando}
        onClose={() => {
          setRegistroEditando(null);
          setDialogOpen(false);
        }}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
      <DataTable
        columns={columnsLote(
          handleConfirmar,
          handleEliminar,
          (lote) => {
            const registroNormalizado = normalizarRegistro(lote, dynamicFields);

            if (
              !registroNormalizado.productorId ||
              !registroNormalizado.exportadorId ||
              !registroNormalizado.responsableId
            ) {
              alert("Este lote no tiene IDs válidos para editar.");
              return;
            }

            setRegistroEditando(registroNormalizado);
            setDialogOpen(true);
          },
          setDialogOpen,
          dataRotulo
        )}
        data={dataLote}
        filterColumnKey="id"
        placeholder="Buscar por ID"
        meta={{ rotulos: dataRotulo }}
      />
    </>
  );
}
