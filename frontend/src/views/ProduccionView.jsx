import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/user-store";
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

export function ProduccionView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produccionEditando, setProduccionEditando] = useState(null);

  // Select de tipo de filtro
  const [tipoFiltro, setTipoFiltro] = useState(""); 
  const [valorFiltro, setValorFiltro] = useState("");
  const [filtroFechaEmpaque, setFiltroFechaEmpaque] = useState("");

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

  //Para filtro de la fecha de empaque
  const toDMY2 = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y.slice(2)}`; // dd/mm/aa
  };


  const transformedData = useMemo(() => {
    if (!dataProduccion) return [];
    return dataProduccion.map((produccion) => {
      const etiqueta = produccion.etiqueta || {};
      const producto = etiqueta.Producto || {};
      const variedad = etiqueta.Variedad || {};
      const pallet = produccion.pallets?.[0] || {};
      const empaque = pallet.empaque?.[0] || {};
      const tipoEmpaque = empaque.tipoEmpaques?.[0]?.tipo || "N/A";

      const empaqueFechaISO = empaque.fecha
        ? new Date(empaque.fecha).toLocaleDateString("en-CA") // ISO para YYYY-MM-DD
        : "";

      const empaqueFechaFormato = empaqueFechaISO ? toDMY2(empaqueFechaISO) : "";

      

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
          ? (() => {
              const date = new Date(empaque.fecha);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const year = String(date.getFullYear()); //  
              return `${day}/${month}/${year}`;
            })()
          : "",

        empaqueFechaISO,   // <- para filtro de fecha
        empaqueFechaFormato,
        empaquePeso: empaque.peso,
        empaqueTipo: tipoEmpaque,
        
      };
    });
  }, [dataProduccion]);

  // Filtros

const filteredData = useMemo(() => {
  return transformedData.filter((item) => {
    let match = true;

    if (tipoFiltro === "Producto") {
      match = valorFiltro
        ? item.productoNombre === valorFiltro
        : true;
    } else if (tipoFiltro === "Estado") {
      match = valorFiltro
        ? (item.estado || "").toLowerCase() === valorFiltro.toLowerCase()
        : true;
    } 
    
    // Filtro separado de fecha

    const matchFecha    = filtroFechaEmpaque
      ? item.empaqueFechaISO === filtroFechaEmpaque   // <-- usa el ISO
      : true;

    return match && matchFecha;
  });
}, [transformedData, tipoFiltro, valorFiltro, filtroFechaEmpaque]);


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
    // Listas únicas
    const productosUnicos = [
      ...new Set(transformedData.map((p) => p.productoNombre).filter(Boolean)),
    ];
   

    return (
      <>
        {/* Filtros */}
        <div className="flex gap-4 mb-4">
          {/* Select principal */}
          <select
            value={tipoFiltro}
            onChange={(e) => {
              setTipoFiltro(e.target.value);
              setValorFiltro(""); // reset al cambiar tipo
            }}
            className="border p-2 rounded"
          >
            <option value="">Seleccionar filtro</option>
            <option value="Estado">Estado</option>
            <option value="Producto">Producto</option>
            
            
          </select>

          {/* Input dinámico según filtro */}
          {tipoFiltro === "Producto" && (
            <select
              value={valorFiltro}
              onChange={(e) => setValorFiltro(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todos los productos</option>
              {productosUnicos.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          )}

          

          {tipoFiltro === "Estado" && (
            <select
              value={valorFiltro}
              onChange={(e) => setValorFiltro(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todos los estados</option>
              <option value="Confirmado">Confirmado</option>
              <option value="No Confirmado">No Confirmado</option>
            </select>
          )}

          {/* Filtro aparte: fecha */}
          <input
            type="date"
            value={filtroFechaEmpaque}
            onChange={(e) => setFiltroFechaEmpaque(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

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
          dataProduccion={filteredData}
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