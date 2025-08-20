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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
        onSuccess: () => setDialogOpen(false), // Cierra el diálogo al crear
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
            {/* Select para elegir tipo de filtro */}
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value);
                setFilterValue("");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" >Sin filtro</SelectItem>
                <SelectItem value="estado">Estado</SelectItem>
                <SelectItem value="productor">CLP</SelectItem>
                <SelectItem value="exportador">Exportador</SelectItem>
                <SelectItem value="producto">Producto</SelectItem>
                <SelectItem value="destino">Destino</SelectItem>
                
              </SelectContent>
            </Select>

            {/* Filtros dinámicos */}
            {filterType === "estado" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="No Confirmado">No Confirmado</SelectItem>
                </SelectContent>
              </Select>
            )}

            {filterType === "productor" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {[...new Set(transformedData.map((i) => i.Productor?.clp).filter(Boolean))].map(
                    (clp) => (
                      <SelectItem key={clp} value={clp}>
                        {clp}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}

            {filterType === "exportador" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {[...new Set(
                    transformedData.map((i) => i.Exportador?.nombreEmpresa).filter(Boolean)
                  )].map((nombre) => (
                    <SelectItem key={nombre} value={nombre}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {filterType === "producto" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {[...new Set(
                    transformedData.map((i) => i.Producto?.nombre).filter(Boolean)
                  )].map((nombre) => (
                    <SelectItem key={nombre} value={nombre}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {filterType === "destino" && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {[...new Set(
                    transformedData.map((i) => i.destino).filter(Boolean)
                  )].map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Filtro de fecha */}
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