import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/produccion/fieldsProduccion";
import { DataTable } from "@/components/admin/DataTable";
import { columnsProduccion } from "@/components/admin/produccion/columnsProduccion";
import { useTableData } from "@/hooks/useTableData";

export function ProduccionView() {
  const {
    data: dataProduccion,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
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

  return (
    <div className="text-end">
      <DialogDemo
        fields={fields}
        title="Registro de Producción Diaria"
        onSubmit={addRegistro}
      />
      <DataTable
        columns={columnsProduccion(confirmRegistro, deleteRegistro)}
        data={dataProduccion}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </div>
  );
}
