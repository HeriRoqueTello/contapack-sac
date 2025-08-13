import { DataTable } from "../../DataTable";
import { columnsEtiqueta } from "../columnsEtiqueta";
import { normalizarEtiqueta } from "../utils/EtiquetaUtils";

/**
 * Componente de tabla para etiqueta
 */
export function EtiquetaTable({
  dataEtiqueta,
  dynamicFields,
  onConfirmar,
  onEliminar,
  onEditar,
  onOpenDialog,
}) {
  const handleEditar = (etiqueta) => {
    const etiquetaNormalizada = normalizarEtiqueta(etiqueta, dynamicFields);

    onEditar(etiquetaNormalizada);
    onOpenDialog(true);
  };

  return (
    <DataTable
      columns={columnsEtiqueta(
        onConfirmar,
        onEliminar,
        handleEditar,
        onOpenDialog
      )}
      data={dataEtiqueta}
      filterColumnKey="id"
      placeholder="Buscar por ID"
    />
  );
}
