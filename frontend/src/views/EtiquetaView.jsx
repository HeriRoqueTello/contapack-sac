import {
  normalizarEtiqueta,
  prepararEtiquetaParaSubmit,
} from "@/components/admin/etiqueta/utils/EtiquetaUtils";
import {
  EtiquetaDialog,
  EtiquetaError,
  EtiquetaLoading,
  EtiquetaTable,
  fields,
  useEtiquetaData,
  useEtiquetaMutations,
} from "@/components/admin/etiqueta";
import { useAuthStore } from "@/store/user-store";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function EtiquetaView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [etiquetaEditando, setEtiquetaEditando] = useState(null);

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Calidad"];
  const navigate = useNavigate();

  const {
    dataEtiqueta,
    dynamicFields,
    isLoading,
    isErrorEtiqueta,
    errorEtiqueta,
  } = useEtiquetaData();

  const {
    addEtiquetaMutate,
    updateEtiquetaMutate,
    deleteEtiquetaMutate,
    confirmarEtiquetaMutate,
  } = useEtiquetaMutations();

  const transformedData = useMemo(() => {
    if (!dataEtiqueta) return [];
    return dataEtiqueta.map((etiqueta) => ({
      ...etiqueta,
      productorClp: etiqueta.Productor?.clp,
      exportadorNombre: etiqueta.Exportador?.nombreEmpresa,
      productoNombre: etiqueta.Producto?.nombre,
      variedadNombre: etiqueta.Variedad?.nombre,
    }));
  }, [dataEtiqueta]);

  const handleSubmit = (formData) => {
    const datosParaEnviar = prepararEtiquetaParaSubmit(formData);

    if (etiquetaEditando) {
      updateEtiquetaMutate.mutate({
        id: etiquetaEditando.id,
        datos: datosParaEnviar,
      });
    } else {
      addEtiquetaMutate.mutate(datosParaEnviar);
    }
  };
  const handleEditar = (etiqueta) => {
    const datosNormalizados = normalizarEtiqueta(etiqueta);
    setEtiquetaEditando(datosNormalizados);
    setDialogOpen(true);
  };

  const handleEliminar = (id) => deleteEtiquetaMutate.mutate(id);
  const handleConfirmar = (id) => confirmarEtiquetaMutate.mutate(id);

  const handleCloseDialog = () => {
    setEtiquetaEditando(null);
    setDialogOpen(false);
  };

  if (isLoading) return <EtiquetaLoading />;
  if (isErrorEtiqueta)
    return (
      <EtiquetaError error={errorEtiqueta} message="Error al cargar etiqueta" />
    );

  if (areasAllow.includes(userArea)) {
    return (
      <>
        <EtiquetaDialog
          fields={fields}
          dynamicFields={dynamicFields}
          onSubmit={handleSubmit}
          initialData={etiquetaEditando}
          onClose={handleCloseDialog}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <EtiquetaTable
          dataEtiqueta={transformedData}
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
