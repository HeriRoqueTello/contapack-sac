import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/produccion/fieldsProduccion";
import { DataTable } from "@/components/admin/DataTable";
import { columnsProduccion } from "@/components/admin/produccion/columnsProduccion";
import { useTableData } from "@/hooks/useTableData";
import { useState } from "react";
import { useAuthStore } from "@/store/user-store";
import { useNavigate } from "react-router";

export function ProduccionView() {
  const { profile } = useAuthStore();
  const userArea = profile.Area.descripcion;
  const areasAllow = ["Sistemas", "Produccion"];
  const navigate = useNavigate();

  const {
    data: dataProduccion,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  } = useTableData("dataProduccion", [
    {
      id: "1",
      estado: "No Confirmado",
      nrPallet: "101",
      categoria: "I",
      calibre: "10",
      tipEmp: "Cajas",
      pesoEmp: "10 kg",
      cantEmp: "30",
    },
  ]);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (areasAllow.includes(userArea)) {
    return (
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Producción Diaria"
          onSubmit={registroEditando ? actualizarRegistro : addRegistro}
          initialData={registroEditando}
          onClose={() => {
            setRegistroEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
        <DataTable
          columns={columnsProduccion(
            confirmRegistro,
            deleteRegistro,
            setRegistroEditando,
            setDialogOpen
          )}
          data={dataProduccion}
          filterColumnKey="id"
          placeholder="Buscar por ID"
        />
      </div>
    );
  }

  return navigate(`/admin`);
}
