import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";
import { useTableData } from "@/hooks/useTableData";
import { useState } from "react";

export function RotuloView() {
  //tabla definida
  const {
    data: dataRotulo,
    addRegistro,
    confirmRegistro,
    deleteRegistro,
    actualizarRegistro,
  } = useTableData("dataRotulo", [
    {
      id: "01",
      estado: "Confirmado",
      fecha: "15/07/25",
      prodProv: "Quory Foods",
      kgIng: "300",
      producto: "palta",
      variedad: "HASS",
      numIng: "1",
      exportador: "Quory Foods",
      responsable: "Anthony Diaz",
      bandJabas: "30",
      numPallet: "3",
      trazRecep: "1231245673417",
      fechaProceso: "18/07/25",
      pesoJabaBand: "10",
      firma: "Anthony Diaz",
      descargado: "Juan Condor",
      detServ: "sin novedad",
      obs: "Pallet completo",
      chequeos: "Materia Prima",
    },
  ]);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Rotulo"
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
        columns={columnsRotulo(
          confirmRegistro,
          deleteRegistro,
          setRegistroEditando,
          setDialogOpen
        )}
        data={dataRotulo}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
