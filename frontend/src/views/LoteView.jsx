import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { fields } from "@/components/admin/recepcion/Lote/fieldsLote";
import { columnsLote } from "@/components/admin/recepcion/Lote/columnsLote";
import { useEffect, useState } from "react";
import {
  actualizarRegistroMP,
  crearRegistroMP,
  eliminarRegistroMP,
  obtenerRegistroMP,
} from "@/services/registroMPService";

export function LoteView() {
  const [registroEditando, setRegistroEditando] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dataLote, setDataLote] = useState([]);
  useEffect(() => {
    obtenerRegistroMP().then(setDataLote);
  }, []);

  //Agregar registro
  const handleAdd = async (nuevoRegistro) => {
    try {
      await crearRegistroMP(nuevoRegistro);
      const actualizados = await obtenerRegistroMP();
      setDataLote(actualizados);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error al agregar", error);
    }
  };

  //Actualizar un registro existente
  const handleUpdate = async (registroActualizado) => {
    try {
      await actualizarRegistroMP(registroEditando.id, registroActualizado);
      const actualizados = await obtenerRegistroMP();
      setDataLote(actualizados);
      setRegistroEditando(null);
      setDialogOpen(false);
    } catch (error) {
      console.log("Error al actualizar: ", error);
    }
  };

  //Eliminar Registro
  const handleEliminar = async (id) => {
    try {
      await eliminarRegistroMP(id);
      //Actualizar la tabla después de eliminar
      const nuevosDatos = await obtenerRegistroMP();
      setDataLote(nuevosDatos);
    } catch (error) {
      console.log("Error al eliminar registro: ", error);
    }
  };

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Registro de Lote"
          onSubmit={registroEditando ? handleUpdate : handleAdd}
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
          null, //O eliminá este si el archivo permite
          handleEliminar,
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
