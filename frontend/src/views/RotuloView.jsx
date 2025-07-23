import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";
import { useState } from "react";
import { convertirChequeos, detectarChequeo } from "@/utils/chequeosUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmarRotulo,
  createRotulo,
  deleteRotulo,
  getRotulos,
  updateRotulo,
} from "@/api/rotuloApi";

export function RotuloView() {
  const queryCliente = useQueryClient();

  //Obtener datos con React Query
  const {
    isLoading,
    data: dataRotulo,
    isError,
    error,
  } = useQuery({
    queryKey: ["rotulos"],
    queryFn: getRotulos,
  });

  //Mutaciones
  const deleteRotuloMutation = useMutation({
    mutationFn: deleteRotulo,
    onSuccess: () => {
      queryCliente.invalidateQueries(["rotulos"]);
    },
  });

  const updateRotuloMutation = useMutation({
    mutationFn: ({ id, datos }) => updateRotulo(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries(["rotulos"]);
    },
  });

  const addRotuloMutation = useMutation({
    mutationFn: createRotulo,
    onSuccess: () => {
      queryCliente.invalidateQueries(["rotulos"]);
    },
  });

  const confirmarRotuloMutation = useMutation({
    mutationFn: confirmarRotulo,
    onSuccess: () => {
      queryCliente.invalidateQueries(["rotulos"]);
    },
  });

  //Estados para el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rotuloEditando, setRotuloEditando] = useState(null);

  //Agregar chequeos de rotulo
  const handleAdd = (nuevoRotulo) => {
    const chequeoTransformado = convertirChequeos(nuevoRotulo.chequeos);
    const datosFinales = { ...nuevoRotulo, ...chequeoTransformado };
    delete datosFinales.chequeos;

    addRotuloMutation.mutate(datosFinales);
    setDialogOpen(false);
  };

  //Actualizar rotulo
  const handleUpdate = (rotuloActualizado) => {
    const chequeoTransformado = convertirChequeos(rotuloActualizado.chequeos);
    const datosFinales = { ...rotuloActualizado, ...chequeoTransformado };
    delete datosFinales.chequeos;

    updateRotuloMutation.mutate({
      id: rotuloEditando.id,
      datos: datosFinales,
    });
    setRotuloEditando(null);
    setDialogOpen(false);
  };

  //Eliminar rotulo
  const handleEliminar = (id) => {
    deleteRotuloMutation.mutate(id);
  };

  // Confirmar rotulo
  const handleConfirmar = (id) => {
    confirmarRotuloMutation.mutate(id);
  };

  //Renderizado
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Rotulo"
          onSubmit={rotuloEditando ? handleUpdate : handleAdd}
          initialData={
            rotuloEditando
              ? { ...rotuloEditando, chequeos: detectarChequeo(rotuloEditando) }
              : null
          }
          onClose={() => {
            setRotuloEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
      <DataTable
        columns={columnsRotulo(
          handleConfirmar,
          handleEliminar,
          setRotuloEditando,
          setDialogOpen
        )}
        data={dataRotulo} //
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
