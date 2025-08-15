import {
  normalizarProduccion,
  prepararProduccionParaSubmit,
} from "@/components/admin/produccion/utils/ProduccionUtils";
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

  const handleSubmit = (formData) => {
    const datosParaEnviar = prepararProduccionParaSubmit(formData);

    if (produccionEditando) {
      updateProduccionMutate.mutate({
        id: produccionEditando.id,
        datos: datosParaEnviar,
      });
    } else {
      addProduccionMutate.mutate(datosParaEnviar);
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
