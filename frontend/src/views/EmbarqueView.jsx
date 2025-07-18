import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/embarque/fieldsEmbarque";
import { DataTable } from "@/components/admin/DataTable";
import { columnsEmbarque } from "@/components/admin/embarque/columnsEmbarque";
import { useTableData } from "@/hooks/useTableData";
import { useState } from "react";

export function EmbarqueView() {
  const {
    data: dataEmbarque,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  } = useTableData("dataEmbarque", [
    {
      id: "1",
      estado: "No Confirmado",
      cliente: "Cliente A",
      fecha: "18/07/2025",
      nrContenedor: "CONT-001",
      puntosCheck: ["1", "2"],
      inspector: "Inspector X",
      contenedorLimp: "SI",
      roturasContenedor: "NO",
      obs: "",
      precintos: "SI",
      cortinAire: "SI",
      termoRegistro: "NO",
      trazabilidadComp: "SI",
      palletsComp: "SI",
      documentacionComp: "SI",
      hInicial: "08:00",
      hFinal: "09:30",
      precintOPlanta: "P-123",
      precintoAduana: "A-456",
      precintoLinea: "L-789",
    },
  ]);

  const [registroEditando, setRegistroEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="text-end">
      <DialogDemo
        fields={fields}
        title="Registro de Embarque"
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
        columns={columnsEmbarque(
          confirmRegistro,
          deleteRegistro,
          setRegistroEditando,
          setDialogOpen
        )}
        data={dataEmbarque}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </div>
  );
}


