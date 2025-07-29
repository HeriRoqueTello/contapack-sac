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

  const handleAdd = (nuevoRegistro) => {
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(nuevoRegistro.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(nuevoRegistro.exportadorId)
    );
    const codigoProductor = productor?.codigo ?? "";
    const codigoExportador = exportador?.codigo ?? "";

    if (!codigoProductor || !codigoExportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    nuevoRegistro.codigo = `${codigoProductor}${codigoExportador}`;
    nuevoRegistro.codNumero = `${nuevoRegistro.codigo}-${nuevoRegistro.numIngreso}`;
    nuevoRegistro.clp = productor?.clp ?? "";
    nuevoRegistro.numSemana = getISOWeekNumber(nuevoRegistro.fecha);
    nuevoRegistro.campaña = new Date(nuevoRegistro.fecha).getFullYear();

    const guia = dynamicFields.guiaProductor?.find(
      (g) => g.productorId === Number(nuevoRegistro.productorId)
    );
    const guiaProductor = guia?.guiaProductor ?? "Sin Guía";
    const pesoGuia = guia?.pesoGuia ?? 0.0;

    nuevoRegistro.pesoNeto = "0.00";
    nuevoRegistro.cantJabas = 0;
    nuevoRegistro.guiaProductor = guiaProductor;
    nuevoRegistro.pesoGuia = pesoGuia;
    nuevoRegistro.difPeso = (
      Number(nuevoRegistro.pesoGuia) - Number(nuevoRegistro.pesoNeto)
    ).toFixed(2);

    addRegistroMPMutation.mutate(nuevoRegistro);

    setDialogOpen(false);
  };

  const handleUpdate = async (registroActualizado) => {
    const productor = dynamicFields.productores?.find(
      (p) => p.id === Number(registroActualizado.productorId)
    );
    const exportador = dynamicFields.exportadores?.find(
      (e) => e.id === Number(registroActualizado.exportadorId)
    );
    const codigoProductor = productor?.codigo ?? "";
    const codigoExportador = exportador?.codigo ?? "";
    registroActualizado.clp = productor?.clp ?? "";

    if (!codigoProductor || !codigoExportador) {
      alert("Debes seleccionar un productor y un exportador válidos.");
      return;
    }

    registroActualizado.codigo = `${codigoProductor}${codigoExportador}`;
    registroActualizado.codNumero = `${registroActualizado.codigo}-${registroActualizado.numIngreso}`;
    registroActualizado.numSemana = getISOWeekNumber(registroActualizado.fecha);
    registroActualizado.campaña = new Date(
      registroActualizado.fecha
    ).getFullYear();
    registroActualizado.difPeso = (
      Number(registroActualizado.pesoGuia) -
      Number(registroActualizado.pesoNeto)
    ).toFixed(2);

    const registroSinRotulos = { ...registroActualizado };
    delete registroSinRotulos.rotulos;

    updateRegistroMPMutation.mutate({
      id: registroEditando.id,
      datos: registroSinRotulos,
    });

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
          setRegistroEditando,
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
