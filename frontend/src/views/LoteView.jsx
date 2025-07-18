import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { useTableData } from "@/hooks/useTableData";
import { fields } from "@/components/admin/recepcion/Lote/fieldsLote";
import { columnsLote } from "@/components/admin/recepcion/Lote/columnsLote";
import { useState } from "react";

export function LoteView() {
  //tabla definida
  const {
    data: dataLote,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  } = useTableData("dataLote", [
    {
      id: "1",
      estado: "Confirmado",
      placa: "ABC-123",
      horaDesc: "08:30",
      exportador: "AgroExport Perú",
      numSemana: "29",
      ordenVolc: "VOLC-456",
      fechaRecep: "2025-07-18",
      guiaProd: "GP-789456",
      prodProv: "Campos del Sur",
      codLote: "0101",
      clp: "163516345261",
      pesoNeto: "1200",
      cantJabas: "60",
      pesoDesc: "50",
      difPeso: "1150",
      empTrans: "Transporte Andino SAC",
      chofer: "Luis Mendoza",
      licCond: "B12345678",
      obs: "Entrega sin novedades",
    },
  ]);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Lote"
          onSubmit={registroEditando ? actualizarRegistro : addRegistro}
          initialData={registroEditando}
          onClose={() => {
            setRegistroEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
      <DataTable
        columns={columnsLote(
          confirmRegistro,
          deleteRegistro,
          setRegistroEditando,
          setDialogOpen
        )}
        data={dataLote}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
