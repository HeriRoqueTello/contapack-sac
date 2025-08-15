import {  useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/user-store";
import {
  LoteDialog,
  LoteError,
  LoteLoading,
  LoteTable,
  fields,
  useLoteData,
  useLoteMutations,
} from "@/components/admin/lote";
import {
  normalizarRegistroParaEditar,
  prepararLoteParaSubmit,
} from "@/components/admin/lote/utils/loteUtils";

export function LoteView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Recepcion"];
  const navigate = useNavigate();

  // Hooks de datos y mutaciones (igual que antes)
  const { dataLote, dynamicFields, isLoading, isError, error } = useLoteData();
  const {
    addRegistroMPMutation,
    updateRegistroMPMutation,
    deleteRegistroMPMutation,
    confirmarRegistroMPMutation,
  } = useLoteMutations();

  // const transformedData = useMemo(() => {
  //   if (!dataLote) return [];

  //   return dataLote.map((lote) => {
  //     // Accedemos a los datos anidados de forma segura según tu log
  //     const guia = lote.Productor?.guias?.[0];
  //     const transporte = lote.transporteDescargas?.[0];
  //     const chofer = transporte?.choferes?.[0];
  //     const responsable = lote.Productor?.responsables?.[0];

  //     // Devolvemos un nuevo objeto "plano" para la tabla
  //     return {
  //       ...lote, // Mantenemos los datos principales del lote (ID, codigo, etc.)
  //       productorNombre: lote.Productor?.nombre,
  //       exportadorNombre: lote.Exportador?.nombreEmpresa,
  //       clp: lote.Productor?.clp,
  //       lugReferencia: lote.Productor?.lugReferencia,

  //       // Aplanamos los datos de las relaciones
  //       fechaGuia: guia?.fechaGuia,
  //       guiaProductor: guia?.guiaProductor,
  //       pesoGuia: guia?.pesoGuia,

  //       placa: transporte?.placa,
  //       placa2: transporte?.placa2,
  //       empresaTransporte: transporte?.empresaTransporte,
  //       guiaTransportista: transporte?.guiaTransportista,

  //       choferNombre: chofer?.nombre,
  //       choferLicencia: chofer?.licencia,

  //       responsableNombre: responsable?.nombre,
  //     };
  //   });
  // }, [dataLote]);

  // Esta es la función que le pasarás como prop 'onSubmit' al DialogDemo
  const handleSubmit = (formData) => {
    // formData son los datos crudos del formulario
    if (registroEditando) {
      // Lógica de Actualización
      try {
        const lotePreparado = prepararLoteParaSubmit(formData, dynamicFields);
        updateRegistroMPMutation.mutate({
          id: registroEditando.id,
          datos: lotePreparado,
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Lógica de Creación
      try {
        const lotePreparado = prepararLoteParaSubmit(formData, dynamicFields);
        addRegistroMPMutation.mutate(lotePreparado);
      } catch (error) {
        alert(error.message);
      }
    }
    setDialogOpen(false);
  };

  const handleEditar = (lote) => {
    const datosNormalizados = normalizarRegistroParaEditar(lote);
    setRegistroEditando(datosNormalizados);
    setDialogOpen(true);
  };

  const handleEliminar = (id) => deleteRegistroMPMutation.mutate(id);
  const handleConfirmar = (id) => confirmarRegistroMPMutation.mutate(id);

  const handleCloseDialog = () => {
    setRegistroEditando(null);
    setDialogOpen(false);
  };

  if (isLoading) return <LoteLoading />;
  if (isError)
    return <LoteError error={error} message="Error al cargar lotes" />;

  if (areasAllow.includes(userArea)) {
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
          dataLote={dataLote || []}
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
