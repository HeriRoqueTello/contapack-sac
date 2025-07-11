import { useState } from "react";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/etiqueta/fieldsEtiqueta";
import { DataTable } from "@/components/admin/DataTable";
import { columnsEtiqueta } from "@/components/admin/etiqueta/columnsEtiqueta";

export function TaEtiquetaView() {
  //tabla definida
  const [dataEtiqueta, setDataEtiqueta] = useState([
    {
      id: "01",
      estado: "Confirmado",
      exportador: "Heri Roque",
      codLote: "0101",
      categoria: "Palta",
      calibre: "10",
      pesoUni: "10 kg",
      codEmp: "1111",
      clp: "1234567890",
      fecha: "03/07/25",
      trazabilidad: "5121321321321",
    },
  ]);


  const handleAddEtiqueta = (newData) => {
    const id = Date.now().toString()
    const newRecord = { id, ...newData }
    setDataEtiqueta((prev) => [...prev, newRecord])
  }

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Etiqueta"
          onSubmit={handleAddEtiqueta} 
        />
      </div>
      <DataTable
        columns={columnsEtiqueta}
        data={dataEtiqueta}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}

