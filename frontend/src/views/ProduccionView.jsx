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

  // Filtros
  const [filtroProducto, setFiltroProducto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
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

  const transformedData = useMemo(() => {
    if (!dataProduccion) return [];
    return dataProduccion.map((produccion) => {
      const etiqueta = produccion.etiqueta || {};
      const producto = etiqueta.Producto || {};
      const variedad = etiqueta.Variedad || {};
      const pallet = produccion.pallets?.[0] || {};
      const empaque = pallet.empaque?.[0] || {};
      const tipoEmpaque = empaque.tipoEmpaques?.[0]?.tipo || "N/A";

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
          ? new Date(empaque.fecha).toISOString().split("T")[0]
          : "",
        empaquePeso: empaque.peso,
        empaqueTipo: tipoEmpaque,
      };
    });
  }, [dataProduccion]);

  // Aplicar filtros
  const filteredData = useMemo(() => {
    return transformedData.filter((item) => {
      const matchProducto = filtroProducto
        ? item.productoNombre === filtroProducto
        : true;
      const matchEstado = filtroEstado
        ? item.estado === filtroEstado
        : true;
      const matchFecha = filtroFechaEmpaque
        ? item.empaqueFecha === filtroFechaEmpaque
        : true;
      return matchProducto && matchEstado && matchFecha;
    });
  }, [transformedData, filtroProducto, filtroEstado, filtroFechaEmpaque]);

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
    // Obtener lista única de productos para el select
    const productosUnicos = [
      ...new Set(transformedData.map((p) => p.productoNombre).filter(Boolean)),
    ];

    return (
      <>
        {/* Filtros */}
        <div className="flex gap-4 mb-4">
          <select
            value={filtroProducto}
            onChange={(e) => setFiltroProducto(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todos los productos</option>
            {productosUnicos.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todos los estados</option>
            <option value="Confirmado">Confirmado</option>
            <option value="No Confirmado">No Confirmado</option>
          </select>

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
