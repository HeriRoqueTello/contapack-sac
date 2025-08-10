import { DataTable } from "../../DataTable";
import { columnsProduccion } from "../columnsProduccion";
import { normalizarProduccion } from "../utils/ProduccionUtils";

/**
 * Componente de tabla para produccion
 */
export function ProduccionTable ({
  dataProduccion,
  dynamicFields,
  onConfirmar,
  onEliminar,
  onEditar,
  onOpenDialog,
}) {
  const handleEditar = (produccion) => {
    const produccionNormalizada = normalizarProduccion(produccion, dynamicFields);

    onEditar(produccionNormalizada);
    onOpenDialog(true);
  };


  return (
    <DataTable
      columns={columnsProduccion(
        onConfirmar,
        onEliminar,
        handleEditar,
        onOpenDialog
      )}
      data={dataProduccion}
      filterColumnKey="id"
      placeholder="Buscar por ID"
    />
  )
}