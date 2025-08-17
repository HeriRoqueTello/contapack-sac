import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Componentes
import { DataTable } from "@/components/admin/DataTable";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";

// Utilidades
import { convertirChequeos, detectarChequeo } from "@/utils/chequeosUtils";

// API
import { fetchDynamicFields } from "@/api/dynamicFieldsApi";
import {
  confirmarRotulo,
  createRotulo,
  deleteRotulo,
  getRotulos,
  updateRotulo,
} from "@/api/rotuloApi";
import { ReporteRotulo } from "@/components/reportes/ReporteRotulo";
import { useAuthStore } from "@/store/user-store";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router";

export function RotuloView() {
  const queryCliente = useQueryClient();

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Recepcion"];
  const navigate = useNavigate();

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

  const mapLoteDataToReporte = (rotulo) => {
    const idComoString = String(rotulo.id);
    const idFormateado = idComoString.padStart(3, "0");
    const codigoFinal = `CP-F${idFormateado}`;
    const numeroFormatoFormateado = idComoString.padStart(6, "0");
    const numeroFormatoFinal = ` N° ${numeroFormatoFormateado}`;

    const responsablesArray = rotulo.Productor?.responsables;

    const nombresResponsables =
      responsablesArray && responsablesArray.length > 0
        ? responsablesArray.map((resp) => resp.nombre).join(", ")
        : "N/A";

    return {
      numeroFormato: numeroFormatoFinal,
      codigo: codigoFinal,
      revision: "02",
      pagina: "1 de 1",
      fecha: rotulo.createdAt,
      productorProveedor: rotulo.RegistroMateriaPrima.Productor.nombre || "N/A",
      kgIngresados: rotulo.kgIngresados,
      bandejas: rotulo.bandJabas,
      producto: rotulo.Producto.nombre,
      numeroPallet: rotulo.numPallet,
      variedad: rotulo.Producto.Variedad.nombre,
      trazRecepcion: rotulo.trazRecepcion,
      lote: rotulo.RegistroMateriaPrima.id,
      numeroIngreso: rotulo.RegistroMateriaPrima.numIngreso,
      fechaProceso: rotulo.fechaProceso,
      exportador: rotulo.RegistroMateriaPrima.Exportador.nombreEmpresa || "N/A",
      pesoJabaBandeja: rotulo.pesoJabaBandeja,
      responsable: nombresResponsables,
      firma: rotulo.firma,
      observaciones: rotulo.RegistroMateriaPrima.obs,
      materiaPrima: rotulo.materiaPrima,
      frutaRechazada: rotulo.frutaRechazada,
      descarte: rotulo.descarte,
    };
  };

  const handleGenerarReporte = (rowData) => {
    // 1. Guarda los datos del registro en el estado para que el componente ReporteTemplate se renderice
    const mappedData = mapLoteDataToReporte(rowData);

    // Obtener la fecha y hora actual en un formato de string
    const now = new Date();
    const dateString = now.toLocaleDateString("es-ES").replace(/\//g, "-"); // Formato dd-mm-yyyy
    const timeString = now
      .toLocaleTimeString("es-ES", { hour12: false })
      .replace(/:/g, "-"); // Formato hh-mm-ss
    const dateTimeString = `${dateString}_${timeString}`;

    // 1. Crea un contenedor temporal fuera de la vista del usuario
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.width = "210mm"; // Ancho de una A4 para html2canvas
    tempContainer.style.padding = "10mm";
    document.body.appendChild(tempContainer);

    // 2. Renderiza el componente de reporte en el contenedor temporal
    const root = createRoot(tempContainer);
    root.render(<ReporteRotulo datos={mappedData} />);

    // 2. Espera un ciclo de renderizado para que el componente esté disponible en el DOM
    setTimeout(() => {
      html2canvas(tempContainer, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        // Desactivamos la capacidad de ignorar la hoja de estilos principal
        ignoreElements: (element) => element.tagName === "STYLE",
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`reporte_${mappedData.numeroFormato}_${dateTimeString}.pdf`);
        })
        .catch((error) => {
          console.error("Error al generar el PDF:", error);
        })
        .finally(() => {
          // 4. Limpia el contenedor temporal del DOM
          root.unmount();
          document.body.removeChild(tempContainer);
        });
    }, 100);
  };

  // Renderizado condicional
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (areasAllow.includes(userArea)) {
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
                ? {
                    ...rotuloEditando,
                    chequeos: detectarChequeo(rotuloEditando),
                  }
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
            setDialogOpen,
            handleGenerarReporte
          )}
          data={dataRotulo || []}
          filterColumnKey="id"
          placeholder="Buscar por ID"
          meta={{ rotulos: dataRotulo }}
        />
      </>
    );
  }
  return navigate(`/admin`);
}
