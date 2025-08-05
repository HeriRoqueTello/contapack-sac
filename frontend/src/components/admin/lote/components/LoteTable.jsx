import { DataTable } from "@/components/admin/DataTable";
import { columnsLote } from "../index";
import { normalizarRegistro, validarRegistroParaEditar } from "../utils/loteUtils";

/**
 * Componente de tabla para lotes
 */
export function LoteTable({
  dataLote,
  dataRotulo,
  dynamicFields,
  onConfirmar,
  onEliminar,
  onEditar,
  onOpenDialog,
}) {
  const handleEditar = (lote) => {
    const registroNormalizado = normalizarRegistro(lote, dynamicFields);

    if (!validarRegistroParaEditar(registroNormalizado)) {
      alert("Este lote no tiene IDs válidos para editar.");
      return;
    }

    onEditar(registroNormalizado);
    onOpenDialog(true);
  };

  return (
    <DataTable
      columns={columnsLote(
        onConfirmar,
        onEliminar,
        handleEditar,
        onOpenDialog,
        dataRotulo
      )}
      data={dataLote}
      filterColumnKey="id"
      placeholder="Buscar por ID"
      meta={{ rotulos: dataRotulo }}
    />
  );
} 