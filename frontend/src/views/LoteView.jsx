import { useState } from "react";
import {
  useLoteData,
  useLoteMutations,
  LoteLoading,
  LoteError,
  LoteDialog,
  LoteTable,
  fields,
} from "@/components/admin/lote";

export function LoteView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  // Hooks personalizados
  const {
    dataLote,
    dataRotulo,
    dynamicFields,
    isLoading,
    isErrorLote,
    isErrorRotulo,
    errorLote,
    errorRotulo,
  } = useLoteData();

  const { handleAdd, handleUpdate, handleEliminar, handleConfirmar } =
    useLoteMutations();

  // Handlers
  const handleSubmit = (registro) => {
    console.log("Datos enviados al backend:", registro);
    if (registroEditando) {
      handleUpdate(registro, dynamicFields);
      setRegistroEditando(null);
      setDialogOpen(false);
    } else {
      handleAdd(registro, dynamicFields);
      setDialogOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setRegistroEditando(null);
    setDialogOpen(false);
  };

  const handleEditar = (registro) => {
    setRegistroEditando(registro);
  };

  // Estados de carga y error
  if (isLoading) return <LoteLoading />;
  if (isErrorLote)
    return <LoteError error={errorLote} message="Error al cargar lotes" />;
  if (isErrorRotulo)
    return <LoteError error={errorRotulo} message="Error al cargar rótulos" />;

  return (
    <>
      <LoteDialog
        fields={fields}
        dynamicFields={dynamicFields}
        onSubmit={handleSubmit}
        initialData={registroEditando}
        onClose={handleCloseDialog}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
      <LoteTable
        dataLote={dataLote}
        dataRotulo={dataRotulo}
        dynamicFields={dynamicFields}
        onConfirmar={handleConfirmar}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
        onOpenDialog={setDialogOpen}
      />
    </>
  );
}
