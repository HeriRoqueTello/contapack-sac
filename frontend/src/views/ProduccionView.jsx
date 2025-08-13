import { normalizarProduccion } from "@/components/admin/produccion/utils/ProduccionUtils";
import {
  fields,
  ProduccionDialog,
  ProduccionError,
  ProduccionLoading,
  ProduccionTable,
  useProduccionData,
  useProduccionMutations,
} from "@/components/admin/produccion";
import { useAuthStore } from "@/store/user-store";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function ProduccionView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produccionEditando, setProduccionEditando] = useState(null);

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Produccion"];
  const navigate = useNavigate();

  //Hooks personalizados
  const {
    dataProduccion,
    dynamicFields,
    isLoading,
    isErrorProduccion,
    errorProduccion,
  } = useProduccionData();

  const {
    addProduccionMutate,
    updateProduccionMutate,
    deleteProduccionMutate,
    confirmarProduccionMutate,
  } = useProduccionMutations();

  //Aplanando la data de producción
  const transformedData = useMemo(() => {

    if (!dataProduccion) return [];
    return dataProduccion.map((produccion) => {
      const etiqueta = produccion.etiqueta || {};
      const producto = etiqueta.Producto || {};
      const variedad = etiqueta.Variedad || {};
      const pallet = produccion.pallets?.[0] || {};
      const empaque = pallet.empaque?.[0] || {};
      const tipoEmpaque = empaque.tipoEmpaques?.[0]?.tipo || "N/A";

      return {
        ...produccion,
        productoNombre: producto.nombre,
        productoVariedad: variedad.nombre,
        productoCalibre: etiqueta.calibre, 
        productoCategoria: etiqueta.categoria,
        etiquetaNumero: etiqueta.id,
        palletNumero: pallet.numeropallet,
        palletCantidad: pallet.cantidad,
        palletPeso: pallet.peso,
        empaqueFecha: empaque.fecha
          ? new Date(empaque.fecha).toLocaleDateString("es-PE", {
              timeZone: "UTC",
            })
          : "N/A",
        empaquePeso: empaque.peso,
        empaqueTipo: tipoEmpaque,
      };
    });
  }, [dataProduccion]);
  
  //Handlers
  const handleAdd = (formData) => {
    const { etiquetaNumero, ...rest } = formData;
    const payload = {
      etiqueta: { id: etiquetaNumero },
      ...rest,
    };
    // Asignar la fecha actual y estado por defecto
    payload.fecha = new Date().toISOString().split("T")[0];
    payload.estado = "No confirmado";
    addProduccionMutate.mutate(payload);
    setDialogOpen(false);
  };

  const handleUpdate = (formData) => {
    updateProduccionMutate.mutate({
      id: produccionEditando.id,
      datos: formData,
    });
    setProduccionEditando(null);
    setDialogOpen(false);
  };

  const handleSubmit = (formData) => {
    if (produccionEditando) {
      handleUpdate(formData);
    } else {
      handleAdd(formData);
    }
  };

  const handleEditar = (produccion) => {
    const datosNormalizados = normalizarProduccion(produccion);
    setProduccionEditando(datosNormalizados);
    setDialogOpen(true);
  };

  const handleEliminar = (id) => deleteProduccionMutate.mutate(id);
  const handleConfirmar = (id) => confirmarProduccionMutate.mutate(id);

  const handleCloseDialog = () => {
    setProduccionEditando(null);
    setDialogOpen(false);
  };

  //Estados de carga y error
  if (isLoading) return <ProduccionLoading />;
  if (isErrorProduccion)
    return (
      <ProduccionError
        error={errorProduccion}
        message="Error al cargar producción"
      />
    );
  if (areasAllow.includes(userArea)) {
    return (
      <>
        <ProduccionDialog
          fields={fields}
          dynamicFields={dynamicFields}
          onSubmit={handleSubmit}
          initialData={produccionEditando}
          onClose={handleCloseDialog}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <ProduccionTable
          dataProduccion={transformedData}
          onConfirmar={handleConfirmar}
          onEliminar={handleEliminar}
          onEditar={handleEditar}
          onOpenDialog={setDialogOpen}
        />
      </>
    );
  }
  return navigate(`/admin`);
}
