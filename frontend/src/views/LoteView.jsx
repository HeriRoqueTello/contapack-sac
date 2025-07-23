import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { fields } from "@/components/admin/recepcion/Lote/fieldsLote";
import { columnsLote } from "@/components/admin/recepcion/Lote/columnsLote";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmarRegistroMP, createRegistroMP, deleteRegistroMP, getRegistroMP, updateRegistroMP } from "@/api/registroMPApi";

export function LoteView() {

  const queryCliente = useQueryClient();

  const {
    isLoading,
    data: dataLote,
    isError,
    error,
  } = useQuery({
    queryKey: ["lotes"],
    queryFn: getRegistroMP,
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  //Agregar registro
  const handleAdd = (nuevoRegistro) => {
    addRegistroMPMutation.mutate(nuevoRegistro);
    setDialogOpen(false);
  };

  //Actualizar un registro existente
  const handleUpdate = async (registroActualizado) => {
    updateRegistroMPMutation.mutate({
      id: registroEditando.id,
      datos: registroActualizado,
    });
    setRegistroEditando(null);
    setDialogOpen(false);
  };

  //Eliminar Registro
  const handleEliminar = async (id) => {
    deleteRegistroMPMutation.mutate(id);
  };

  //Confirmar Registro
  const handleConfirmar = async (id) => {
    confirmarRegistroMPMutation.mutate(id);
  };

  //Renderizado
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
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
      </div>
      <DataTable
        columns={columnsLote(
          handleConfirmar,
          handleEliminar,
          setRegistroEditando,
          setDialogOpen
        )}
        data={dataLote}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
