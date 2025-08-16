
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

  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

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

  // Filtrado dinámico (incluyendo Estado)
  const filteredData = transformedData.filter((item) => {
    if (!filterType || !filterValue) return true;

    if (filterType === "productor") {
      return item.Productor?.clp === filterValue;
    }
    if (filterType === "exportador") {
      return item.Exportador?.nombreEmpresa === filterValue;
    }
     if (filterType === "fecha") {
    const fechaItem = item.fechaEmp?.split("T")[0]; // extraer solo yyyy-mm-dd
    return fechaItem === filterValue;
    }
     if (filterType === "estado") {
    return (
      item.estado?.toLowerCase().trim() === filterValue.toLowerCase().trim()
    );
  }
    return true;
  });

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
        {/* Controles de filtro */}
        <div className="flex gap-2 mb-4">
          <select
            className="border rounded p-2"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue("");
            }}
          >
            <option value="">Seleccionar filtro</option>
            
            <option value="estado">Estado</option>
            <option value="productor">CLP</option>
            <option value="exportador">Exportador</option>
            <option value="fecha">Fecha de Empaque</option>
            
          </select>

          {filterType === "estado" && (
            <select
              className="border rounded p-2"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              
              <option value="Confirmado">Confirmado</option>
              <option value="No confirmado">No Confirmado</option>
            </select>
          )}

          {filterType === "productor" && (
            <select
              className="border rounded p-2"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Todos</option>
              {[...new Set(transformedData.map((i) => i.Productor?.clp).filter(Boolean))].map((clp) => (
                <option key={clp} value={clp}>{clp}</option>
              ))}
            </select>
          )}

          {filterType === "exportador" && (
            <select
              className="border rounded p-2"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Todos</option>
              {[...new Set(transformedData.map((i) => i.Exportador?.nombreEmpresa).filter(Boolean))].map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>
          )}

          {filterType === "fecha" && (
            <input
              type="date"
              className="border rounded p-2"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}

          
        </div>

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
          dataEtiqueta={filteredData}
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
