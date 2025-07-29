import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";

// Utilidades
import { convertirChequeos, detectarChequeo } from "@/utils/chequeosUtils";

// API
import {
  confirmarRotulo,
  createRotulo,
  deleteRotulo,
  getRotulos,
  updateRotulo,
} from "@/api/rotuloApi";
import { fetchDynamicFields } from "@/api/dynamicFieldsApi"; // Importa los datos dinámicos

export function RotuloView() {
  const queryCliente = useQueryClient();

  // Estado para datos dinámicos (como productores)
  const [dynamicFields, setDynamicFields] = useState({});

  // Estado para controlar el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rotuloEditando, setRotuloEditando] = useState(null);

  // Cargar datos dinámicos al montar el componente
  useEffect(() => {
    const cargarCampos = async () => {
      const data = await fetchDynamicFields(); // trae productores desde el backend
      setDynamicFields(data); // guarda en el estado
    };
    cargarCampos();
  }, []);

  // Obtener todos los rotulos
  const {
    isLoading,
    data: dataRotulo,
    isError,
    error,
  } = useQuery({
    queryKey: ["rotulos"],
    queryFn: getRotulos,
  });

  // Mutaciones
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

  // Agregar nuevo rotulo
  const handleAdd = (nuevoRotulo) => {
    const chequeoTransformado = convertirChequeos(nuevoRotulo.chequeos);

    nuevoRotulo.pesoJabaBandeja = (
      nuevoRotulo.kgIngresados / nuevoRotulo.bandJabas
    ).toFixed(2); // Calcula el peso por jaba/bandeja

    const datosFinales = { ...nuevoRotulo, ...chequeoTransformado };
    delete datosFinales.chequeos;

    addRotuloMutation.mutate(datosFinales);
    setDialogOpen(false);
  };

  // Actualizar rotulo existente
  const handleUpdate = (rotuloActualizado) => {
    const chequeoTransformado = convertirChequeos(rotuloActualizado.chequeos);

    rotuloActualizado.pesoJabaBandeja = (
      rotuloActualizado.kgIngresados / rotuloActualizado.bandJabas
    ).toFixed(2); // Calcula el peso por jaba/bandeja

    const datosFinales = { ...rotuloActualizado, ...chequeoTransformado };
    delete datosFinales.chequeos;

    updateRotuloMutation.mutate({
      id: rotuloEditando.id,
      datos: datosFinales,
    });
    setRotuloEditando(null);
    setDialogOpen(false);
  };

  // Eliminar rotulo
  const handleEliminar = (id) => {
    deleteRotuloMutation.mutate(id);
  };

  // Confirmar rotulo
  const handleConfirmar = (id) => {
    confirmarRotuloMutation.mutate(id);
  };

  // Renderizado condicional
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields} // campos del formulario
          dynamic={dynamicFields} // datos dinámicos como productores
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
        data={dataRotulo}
        filterColumnKey="id"
        placeholder="Buscar por ID"
        meta={{ rotulos: dataRotulo }} // <-- aquí pasas los rótulos
      />
    </>
  );
}
