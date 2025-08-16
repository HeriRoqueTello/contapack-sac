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
  const [filterDate, setFilterDate] = useState(""); // fecha separada

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
      estado: etiqueta.estado?.trim(), // 🔹 Normalizamos estado
    }));
  }, [dataEtiqueta]);

  // Filtrado dinámico
  const filteredData = transformedData.filter((item) => {
    let cumple = true;

    // Filtro select
    if (filterType && filterValue) {
      if (filterType === "estado") {
        cumple =
          item.estado?.toLowerCase() === filterValue.toLowerCase();
      }
      if (filterType === "productor") {
        cumple = item.Productor?.clp === filterValue;
      }
      if (filterType === "exportador") {
        cumple = item.Exportador?.nombreEmpresa === filterValue;
      }
      if (filterType === "producto") {
        cumple = item.Producto?.nombre === filterValue;
      }
      if (filterType === "destino") {
        cumple = item.destino === filterValue;
      }
    }

    // Filtro separado de fecha
    if (filterDate) {
      const fechaItem = item.fechaEmp?.split("T")[0];
      if (fechaItem !== filterDate) cumple = false;
    }

    return cumple;
  });

  const handleSubmit = (formData) => {
    const datosParaEnviar = prepararEtiquetaParaSubmit(formData);

    if (etiquetaEditando) {
      updateEtiquetaMutate.mutate({
        id: etiquetaEditando.id,
        datos: datosParaEnviar,
      });
    } else {
      addEtiquetaMutate.mutate(datosParaEnviar, {
        onSuccess: () => setDialogOpen(false), // 🔹 Cierra el diálogo al crear
      });
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
        <div className="flex gap-4 mb-4">
          <div className="flex gap-2">
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
              <option value="producto">Producto</option>
              <option value="destino">Destino</option>
            </select>

            {filterType === "estado" && (
              <select
                className="border rounded p-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Confirmado">Confirmado</option>
                <option value="No Confirmado">No Confirmado</option>
              </select>
            )}

            {filterType === "productor" && (
              <select
                className="border rounded p-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Todos</option>
                {[...new Set(
                  transformedData.map((i) => i.Productor?.clp).filter(Boolean)
                )].map((clp) => (
                  <option key={clp} value={clp}>
                    {clp}
                  </option>
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
                {[...new Set(
                  transformedData
                    .map((i) => i.Exportador?.nombreEmpresa)
                    .filter(Boolean)
                )].map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}

              </select>

            )}
            {filterType === "producto" && (
              <select
                className="border rounded p-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Todos</option>
                {[...new Set(
                  transformedData.map((i) => i.Producto?.nombre).filter(Boolean)
                )].map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>
            )}
            {filterType === "destino" && (
              <select
                className="border rounded p-2"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Todos</option>
                {[...new Set(
                  transformedData
                    .map((i) => i.destino) // 
                    .filter(Boolean)
                )].map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            )}

          </div>

          {/* Filtro separado de fecha */}
          <div>
            <input
              type="date"
              className="border rounded p-2"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>

        <EtiquetaDialog
          fields={fields}
          dynamicFields={dynamicFields}
          onSubmit={handleSubmit}
          initialData={etiquetaEditando}
          onClose={handleCloseDialog}
          open={dialogOpen}
          setOpen={setDialogOpen}
          description="Formulario de registro de etiqueta" // 🔹 Para evitar el warning
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