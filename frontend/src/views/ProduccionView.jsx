import { useState } from "react";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/produccion/fieldsProduccion";
import { DataTable } from "@/components/admin/DataTable";
import { columnsProduccion } from "@/components/admin/produccion/columnsProduccion";

export function ProduccionView() {

   const [dataProduccion, setDataProduccion] = useState([
    {
      id: "01",
      estado: "No Confirmado",
      nrPallet: "101",
      categoria: "I",
      calibre: "10",
      tipEmp: "Cajas",
      pesoEmp: "10 kg",
      cantEmp: "30"
    },
  ]);

  const confirmarRegistro = (id) => {
  setDataProduccion((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, estado: "Confirmado" } : item
    )
  )
  }


  const handleAddProduccion = (newData) => {
    const id = Date.now().toString()
    const newRecord = { id, ...newData }
    setDataProduccion((prev) => [...prev, newRecord])
  }


  return (
    <div className="text-end">
      <DialogDemo 
      fields={fields} 
      title="Registro de Producción Diaria"
       onSubmit={handleAddProduccion}
      />
      <DataTable
        columns={columnsProduccion(confirmarRegistro)}
        data={dataProduccion}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </div>
  );
}
