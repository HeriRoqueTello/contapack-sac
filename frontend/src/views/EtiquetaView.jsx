import { useTableData } from "@/hooks/useTableData";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/etiqueta/fieldsEtiqueta";
import { DataTable } from "@/components/admin/DataTable";
import { columnsEtiqueta } from "@/components/admin/etiqueta/columnsEtiqueta";

export function EtiquetaView() {
 
  const {
      data: dataEtiqueta,
      addRegistro,
      confirmRegistro,
      deleteRegistro,
    } = useTableData("dataEtiqueta",[
    {
      id: "1",
      estado: "Confirmado",
      exportador: "Heri Roque",
      codLote: "0101",
      categoria: "I",
      calibre: "10",
      pesoUni: "10 kg",
      codEmp: "1111",
      clp: "1234567890",
      fecha: "03/07/25",
      trazabilidad: "5121321321321",
    },
  ]);




  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Etiqueta"
          onSubmit={addRegistro} 
        />
      </div>
      <DataTable
        columns={columnsEtiqueta(confirmRegistro, deleteRegistro)}
        data={dataEtiqueta}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}

