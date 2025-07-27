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

export function LoteView() {
  const queryCliente = useQueryClient();

  // Estado para datos dinámicos
  const [dynamicFields, setDynamicFields] = useState({});

  // Estado para controlar el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  // Cargar datos dinámicos al montar el componente
  useEffect(() => {
    const cargarCampos = async () => {
      const data = await fetchDynamicFields(); // Trae datos dinámicos desde el backend
      setDynamicFields(data); // Guarda en el estado
    };
    cargarCampos();
  }, []);

  // Obtener todos los registros de MP
  const {
    isLoading,
    data: dataLote,
    isError,
    error,
  } = useQuery({
    queryKey: ["lotes"],
    queryFn: getRegistroMP,
  });

  // Mutaciones
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

  // Agregar registro
  const handleAdd = (nuevoRegistro) => {
    const productor = dynamicFields.productores.find(
      (p) => p.id === nuevoRegistro.productorId
    );
    const exportador = dynamicFields.exportadores.find(
      (e) => e.id === nuevoRegistro.exportadorId
    );
    if (productor && exportador) {
      nuevoRegistro.codigo = `${productor.codigo}${exportador.codigo}`;
    }

    addRegistroMPMutation.mutate(nuevoRegistro);
    setDialogOpen(false);
  };

  // Actualizar un registro existente
  const handleUpdate = async (registroActualizado) => {
    const productor = dynamicFields.productores.find(
      (p) => p.id === registroActualizado.productorId
    );
    const exportador = dynamicFields.exportadores.find(
      (e) => e.id === registroActualizado.exportadorId
    );
    if (productor && exportador) {
      registroActualizado.codigo = `${productor.codigo}${exportador.codigo}`;
    }

    updateRegistroMPMutation.mutate({
      id: registroEditando.id,
      datos: registroActualizado,
    });
    setRegistroEditando(null);
    setDialogOpen(false);
  };

  // Eliminar Registro
  const handleEliminar = async (id) => {
    deleteRegistroMPMutation.mutate(id);
  };

  // Confirmar Registro
  const handleConfirmar = async (id) => {
    confirmarRegistroMPMutation.mutate(id);
  };

  // Renderizado
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-end">
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
