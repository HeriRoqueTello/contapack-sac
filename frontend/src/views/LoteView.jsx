import { useState, useMemo } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function LoteView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  // --- Filtros (mismo esquema que RotuloView) ---
  const [filterType, setFilterType] = useState("");        // estado | productor | exportador
  const [filterValue, setFilterValue] = useState("");
  const [filterDateType, setFilterDateType] = useState(""); // fechaRecepcion | fechaGuia
  const [filterDateValue, setFilterDateValue] = useState("");

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Recepcion"];
  const navigate = useNavigate();

  const { dataLote, dynamicFields, isLoading, isError, error } = useLoteData();
  const {
    addRegistroMPMutation,
    updateRegistroMPMutation,
    deleteRegistroMPMutation,
    confirmarRegistroMPMutation,
  } = useLoteMutations();

  const handleSubmit = (formData) => {
    if (registroEditando) {
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

  // --- Normalización para filtros (igual que en RotuloView) ---
  const transformedData = useMemo(() => {
    if (!dataLote) return [];

    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    return dataLote.map((lote) => {
      const guia = lote?.Productor?.guias?.[0];

      return {
        ...lote, // mantenemos objeto original para la tabla
        estadoNorm: lote.estado?.trim(),
        productorNombre: lote.Productor?.nombre ?? null,
        exportadorNombre: lote.Exportador?.nombreEmpresa ?? null,
        responsableNombre: lote?.Productor?.responsables?.[0]?.nombre ?? null,
        fechaRecepcionNorm: formatDate(lote.fecha),
        fechaGuiaNorm: formatDate(guia?.fechaGuia),
      };
    });
  }, [dataLote]);

  // --- Aplicación de filtros (mismo criterio que RotuloView) ---
  const filteredData = useMemo(() => {
  return transformedData.filter((item) => {
    let cumple = true;

    // Filtro select principal
    if (filterType && filterValue && filterValue !== "all") {
      const filterValLower = String(filterValue).toLowerCase();

      if (filterType === "estado") {
        cumple = cumple && item.estadoNorm?.toLowerCase() === filterValLower;
      }
      if (filterType === "productor") {
        cumple = cumple && item.productorNombre === filterValue;
      }
      if (filterType === "exportador") {
        cumple = cumple && item.exportadorNombre === filterValue;
      }
      if (filterType === "responsable") {
        cumple = cumple && item.responsableNombre === filterValue;
      }
    }

    // Filtro de fecha aparte
    if (filterDateType && filterDateValue) {
      if (filterDateType === "fechaRecepcion") {
        cumple = cumple && item.fechaRecepcionNorm === filterDateValue;
      }
      if (filterDateType === "fechaGuia") {
        cumple = cumple && item.fechaGuiaNorm === filterDateValue;
      }
    }

    return cumple;
  });
}, [transformedData, filterType, filterValue, filterDateType, filterDateValue]);

  if (isLoading) return <LoteLoading />;
  if (isError) return <LoteError error={error} message="Error al cargar lotes" />;

  if (areasAllow.includes(userArea)) {
    return (
      <>
        {/* --- FILTROS (clonados del patrón de RotuloView) --- */}
        <div className="flex gap-4 mb-4">
          {/* Filtro principal: Estado / Productor / Exportador */}
          <div className="flex gap-2">
            <Select
              value={filterType}
              onValueChange={(val) => {
                setFilterType(val);
                setFilterValue("");
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sin filtro</SelectItem>
                <SelectItem value="estado">Estado</SelectItem>
                <SelectItem value="productor">Productor</SelectItem>
                <SelectItem value="exportador">Exportador</SelectItem>
                <SelectItem value="responsable">Responsable</SelectItem>
              </SelectContent>
            </Select>

            {filterType && (
              <Select
                value={filterValue}
                onValueChange={setFilterValue}
              >
                <SelectTrigger className="w-[220px]">
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

                  {/* Responsable */}
                  {filterType === "responsable" &&
                    [
                      ...new Set(
                        transformedData
                          .map((i) => i.responsableNombre)
                          .filter(Boolean)
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

          {/* Filtro de fechas: Fecha de recepción / Fecha de guía */}
          <div className="flex gap-2">
            <Select
              value={filterDateType}
              onValueChange={(val) => {
                setFilterDateType(val);
                setFilterDateValue("");
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo de fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sin filtro</SelectItem>
                <SelectItem value="fechaRecepcion">Fecha de Recepción</SelectItem>
                <SelectItem value="fechaGuia">Fecha de Guía</SelectItem>
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
          dataLote={filteredData || []}
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