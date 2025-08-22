import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";

// Componentes
import { DataTable } from "@/components/admin/DataTable";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router";
import { RotuloLoading } from "@/components/admin/recepcion/rotulo/RotuloLoading";
import { RotuloError } from "@/components/admin/recepcion/rotulo/RotuloError";

export function RotuloView() {
  const queryCliente = useQueryClient();
  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Recepcion"];
  const navigate = useNavigate();

  // Estados para filtros
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterDateType, setFilterDateType] = useState("");
  const [filterDateValue, setFilterDateValue] = useState("");

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
    ).toFixed(2);

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
    ).toFixed(2);

    const datosFinales = { ...rotuloActualizado, ...chequeoTransformado };
    delete datosFinales.chequeos;

    updateRotuloMutation.mutate({
      id: rotuloEditando.id,
      datos: datosFinales,
    });
    setRotuloEditando(null);
    setDialogOpen(false);
  };

  const handleEliminar = (id) => deleteRotuloMutation.mutate(id);
  const handleConfirmar = (id) => confirmarRotuloMutation.mutate(id);

  const mapLoteDataToReporte = (rotulo) => {
    const idComoString = String(rotulo.id).padStart(3, "0");
    const numeroFormato = ` N° ${String(rotulo.id).padStart(6, "0")}`;
    const responsablesArray = rotulo.Productor?.responsables;
    const nombresResponsables =
      responsablesArray && responsablesArray.length > 0
        ? responsablesArray.map((resp) => resp.nombre).join(", ")
        : "N/A";

    return {
      numeroFormato,
      codigo: `CP-F${idComoString}`,
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
    const mappedData = mapLoteDataToReporte(rowData);
    const now = new Date();
    const dateString = now.toLocaleDateString("es-ES").replace(/\//g, "-");
    const timeString = now
      .toLocaleTimeString("es-ES", { hour12: false })
      .replace(/:/g, "-");
    const dateTimeString = `${dateString}_${timeString}`;

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.width = "210mm";
    tempContainer.style.padding = "10mm";
    document.body.appendChild(tempContainer);

    const root = createRoot(tempContainer);
    root.render(<ReporteRotulo datos={mappedData} />);

    setTimeout(() => {
      html2canvas(tempContainer, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        ignoreElements: (e) => e.tagName === "STYLE",
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
        .finally(() => {
          root.unmount();
          document.body.removeChild(tempContainer);
        });
    }, 100);
  };

  // --- FILTROS ---
  const transformedData = useMemo(() => {
    const mapped =
      dataRotulo?.map((rotulo) => {
        const fechaRaw = rotulo.RegistroMateriaPrima?.fecha;
        const fechaProcesoRaw = rotulo.fechaProceso;

        const formatDate = (date) => {
          if (!date) return null;
          const d = new Date(date);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          return `${yyyy}-${mm}-${dd}`;
        };

        return {
          ...rotulo,
          estado: rotulo.estado?.trim(),
          productorNombre: rotulo.RegistroMateriaPrima?.Productor?.nombre,
          exportadorNombre:
            rotulo.RegistroMateriaPrima?.Exportador?.nombreEmpresa,
          producto: rotulo.Producto?.nombre,
          loteNombre:
            rotulo.RegistroMateriaPrima?.nombreLote ||
            rotulo.RegistroMateriaPrima?.id,
          fecha: formatDate(fechaRaw),
          fechaProceso: formatDate(fechaProcesoRaw),
        };
      }) || [];

    // Ordenar por fecha de creación (ascendente → nuevos al final)
    return mapped.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [dataRotulo]);

  const filteredData = useMemo(() => {
    return transformedData.filter((item) => {
      let cumple = true;

      // Filtro por selects
      if (filterType && filterValue && filterValue !== "all") {
        const filterValLower = String(filterValue).toLowerCase();

        if (filterType === "estado")
          cumple = cumple && item.estado?.toLowerCase() === filterValLower;

        if (filterType === "productor")
          cumple = cumple && item.productorNombre === filterValue;

        if (filterType === "exportador")
          cumple = cumple && item.exportadorNombre === filterValue;

        if (filterType === "producto")
          cumple = cumple && item.producto === filterValue;

        if (filterType === "lote")
          cumple = cumple && String(item.loteNombre) === String(filterValue);
      }

      // Filtro por fechas
      if (filterDateType && filterDateValue) {
        if (filterDateType === "fecha")
          cumple = cumple && item.fecha === filterDateValue;

        if (filterDateType === "fechaProceso")
          cumple = cumple && item.fechaProceso === filterDateValue;
      }

      return cumple;
    });
  }, [
    transformedData,
    filterType,
    filterValue,
    filterDateType,
    filterDateValue,
  ]);

  // Renderizado
  if (isLoading) return <RotuloLoading />;
  if (isError)
    return <RotuloError error={error} message="Error al cargar rotulo" />;

  if (!areasAllow.includes(userArea)) return navigate(`/admin`);

  return (
    <>
      {/* FILTROS */}
      <div className="flex gap-4 mb-4">
        {/* Filtro principal */}
        <div className="flex gap-2">
          <Select
            value={filterType}
            onValueChange={(val) => {
              setFilterType(val);
              setFilterValue("");
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sin filtro</SelectItem>
              <SelectItem value="estado">Estado</SelectItem>
              <SelectItem value="productor">Productor</SelectItem>
              <SelectItem value="exportador">Exportador</SelectItem>
              <SelectItem value="producto">Producto</SelectItem>
              <SelectItem value="lote">Lote asociado</SelectItem>
            </SelectContent>
          </Select>

          {filterType && (
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filterType === "estado" &&
                  ["Confirmado", "No Confirmado"].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                {filterType === "productor" &&
                  [
                    ...new Set(
                      transformedData
                        .map((i) => i.productorNombre)
                        .filter(Boolean)
                    ),
                  ].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                {filterType === "exportador" &&
                  [
                    ...new Set(
                      transformedData
                        .map((i) => i.exportadorNombre)
                        .filter(Boolean)
                    ),
                  ].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                {filterType === "producto" &&
                  [
                    ...new Set(
                      transformedData.map((i) => i.producto).filter(Boolean)
                    ),
                  ].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                {filterType === "lote" &&
                  [
                    ...new Set(
                      transformedData.map((i) => i.loteNombre).filter(Boolean)
                    ),
                  ].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Filtro fechas */}
        <div className="flex gap-2">
          <Select
            value={filterDateType}
            onValueChange={(val) => {
              setFilterDateType(val);
              setFilterDateValue("");
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sin filtro</SelectItem>
              <SelectItem value="fecha">Fecha</SelectItem>
              <SelectItem value="fechaProceso">Fecha de Proceso</SelectItem>
            </SelectContent>
          </Select>

          {filterDateType && (
            <input
              type="date"
              className="border rounded p-2"
              value={filterDateValue}
              onChange={(e) => setFilterDateValue(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="text-end">
        <DialogDemo
          fields={fields}
          dynamic={dynamicFields}
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

      {/* DataTable */}
      <DataTable
        columns={columnsRotulo(
          handleConfirmar,
          handleEliminar,
          setRotuloEditando,
          setDialogOpen,
          handleGenerarReporte
        )}
        data={filteredData}
        filterColumnKey="id"
        placeholder="Buscar por ID"
        meta={{ rotulos: filteredData }}
      />
    </>
  );
}
