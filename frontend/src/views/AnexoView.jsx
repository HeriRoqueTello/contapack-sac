import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { useTableData } from "@/hooks/useTableData";
import { columnsAnexo } from "@/components/admin/anexo/columnsAnexo";
import { useAuthStore } from "@/store/user-store";
import { useNavigate } from "react-router";
export function AnexoView() {
  //tabla definida
  const {
    data: dataAnexo,
    confirmRegistro,
    deleteRegistro,
  } = useTableData("dataAnexo");

  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Produccion", "Recepcion", "Calidad"];
  const navigate = useNavigate();

  if (areasAllow.includes(userArea)) {
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

  return navigate(`/admin`);
}
