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

  //Aplanando la data de producción
  const transformedData = useMemo(() => {
    if (!dataProduccion) return [];
    return dataProduccion.map((produccion) => {
      const Producto = produccion.Producto;
      const pallet = produccion.pallets?.[0];
      const empaque = pallet?.empaque?.[0];
      const tipoEmpaque = empaque?.tipoEmpaques?.[0]?.tipo || "N/A";

      return {
        ...produccion,
        productoNombre: Producto?.nombre,
        productoVariedad: Producto?.Variedad?.nombre,
        productoCalibre: Producto?.Calibre?.nombre,
        productoCategoria: Producto?.Categoria?.nombre,
        palletNumero: pallet?.numeropallet,
        palletCantidad: pallet?.cantidad,
        palletPeso: pallet?.peso,
        empaqueFecha: empaque
          ? new Date(empaque.fecha).toLocaleDateString("es-PE", {
              timeZone: "UTC",
            })
          : "N/A",
        empaquePeso: empaque?.peso,
        empaqueTipo: tipoEmpaque,
      };
    });
  }, [dataProduccion]);

  const { handleAdd, handleUpdate, handleEliminar, handleConfirmar } =
    useProduccionMutations();

  //Handlers
  const handleSubmit = (produccion) => {
    if (produccionEditando) {
      handleUpdate(produccionEditando.id, produccion, dynamicFields);
      setProduccionEditando(null);
      setDialogOpen(false);
    } else {
      handleAdd(produccion, dynamicFields);
      setDialogOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setProduccionEditando(null);
    setDialogOpen(false);
  };

  const handleEditar = (produccion) => {
    setProduccionEditando(produccion);
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
          dynamicFields={dynamicFields}
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
