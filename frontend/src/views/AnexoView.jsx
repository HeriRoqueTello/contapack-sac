import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { useTableData } from "@/hooks/useTableData";
import { columnsAnexo } from "@/components/admin/anexo/columnsAnexo";
;

export function AnexoView() {
  //tabla definida
  const {
    data: dataAnexo,
    confirmRegistro,
    deleteRegistro,
  } = useTableData("dataAnexo");

  return (
    <>
      <DataTable
        columns={columnsAnexo(confirmRegistro, deleteRegistro)}
        data={dataAnexo}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
          