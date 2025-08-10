import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { columnsEtiqueta } from "@/components/admin/etiqueta/columnsEtiqueta";
import { fields } from "@/components/admin/etiqueta/fieldsEtiqueta";

// API
import {
  confirmarEtiqueta,
  createEtiqueta,
  deleteEtiqueta,
  getEtiquetas,
  updateEtiqueta,
} from "@/api/etiquetaApi";
import { fetchDynamicFields } from "@/api/dynamicFieldsApi";

export function EtiquetaView() {
  const queryCliente = useQueryClient();

  const [dynamicFields, setDynamicFields] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [etiquetaEditando, setEtiquetaEditando] = useState(null);

  useEffect(() => {
    const cargarCampos = async () => {
      const data = await fetchDynamicFields(); // trae productos y exportadores
      console.log("Datos dinámicos recibidos:", data);
      setDynamicFields(data);
    };
    cargarCampos();
  }, []);


  // Query para obtener todas las etiquetas
  const {
    isLoading,
    data: dataEtiqueta,
    isError,
    error,
  } = useQuery({
    queryKey: ["etiquetas"],
    queryFn: getEtiquetas,
  });

  //useEffect(() => {
    //if (dataEtiqueta) {
    //console.log("Data de etiquetas recibida en frontend:", dataEtiqueta);}
   //}, [dataEtiqueta]);


  // Mutaciones
  const deleteEtiquetaMutation = useMutation({
    mutationFn: deleteEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries(["etiquetas"]);
    },
  });

  const updateEtiquetaMutation = useMutation({
    mutationFn: ({ id, datos }) => updateEtiqueta(id, datos),
    onSuccess: () => {
      queryCliente.invalidateQueries(["etiquetas"]);
    },
  });

  const addEtiquetaMutation = useMutation({
    mutationFn: createEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries(["etiquetas"]);
    },
  });

  const confirmarEtiquetaMutation = useMutation({
    mutationFn: confirmarEtiqueta,
    onSuccess: () => {
      queryCliente.invalidateQueries(["etiquetas"]);
    },
  });

  // Handlers
  const handleAdd = (nuevaEtiqueta) => {
    addEtiquetaMutation.mutate(nuevaEtiqueta);
    setDialogOpen(false);
  };

  const handleUpdate = (etiquetaActualizada) => {
    updateEtiquetaMutation.mutate({
      id: etiquetaEditando.id,
      datos: etiquetaActualizada,
    });
    setEtiquetaEditando(null);
    setDialogOpen(false);
  };

  const handleEliminar = (id) => {
    deleteEtiquetaMutation.mutate(id);
  };

  const handleConfirmar = (id) => {
    confirmarEtiquetaMutation.mutate(id);
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          dynamic={dynamicFields}
          title="Etiqueta"
          onSubmit={etiquetaEditando ? handleUpdate : handleAdd}
          initialData={etiquetaEditando}
          onClose={() => {
            setEtiquetaEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>

      <DataTable
        columns={columnsEtiqueta(
          handleConfirmar,
          handleEliminar,
          setEtiquetaEditando,
          setDialogOpen
        )}
        data={dataEtiqueta}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
