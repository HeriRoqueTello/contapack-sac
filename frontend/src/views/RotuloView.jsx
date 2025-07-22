import { DialogDemo } from "@/components/admin/dialogDemo";
import { DataTable } from "@/components/admin/DataTable";
import { columnsRotulo } from "@/components/admin/recepcion/rotulo/columnsRotulo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";
import { useEffect, useState } from "react";
import { convertirChequeos, detectarChequeo } from "@/utils/chequeosUtils";
import {
  actualizarRotulo,
  confirmarRotulo,
  crearRotulo,
  eliminarRotulo,
  obtenerRotulo,
} from "@/services/rotuloServices";
import { obtenerRegistroMP } from "@/services/registroMPService";

export function RotuloView() {
  const [rotuloEditando, setRotuloEditando] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dataRotulo, setDataRotulo] = useState([]);
  useEffect(() => {
    obtenerRotulo().then(setDataRotulo);
  }, []);

  const [registrosMP, setRegistrosMP] = useState([]);
  useEffect(() => {
    obtenerRegistroMP().then(setRegistrosMP);
  }, []);

  //Agregar rotulo
  const handleAdd = async (nuevoRotulo) => {
    try {
      const chequeoTransformado = convertirChequeos(nuevoRotulo.chequeos);
      const datosFinales = { ...nuevoRotulo, ...chequeoTransformado };
      delete datosFinales.chequeos; //Evitar enviar string al backend

      await crearRotulo(datosFinales);
      const actualizados = await obtenerRotulo();
      setDataRotulo(actualizados);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error al agregar", error);
    }
  };

  //Agregar un rotulo existente
  const handleUpdate = async (rotuloActualizado) => {
    try {
      const chequeoTransformado = convertirChequeos(rotuloActualizado.chequeos);
      const datosFinales = { ...rotuloActualizado, ...chequeoTransformado };
      delete datosFinales.chequeos; //Evitar enviar string al backend

      await actualizarRotulo(rotuloEditando.id, datosFinales);
      const actualizados = await obtenerRotulo();
      setDataRotulo(actualizados);
      setRotuloEditando(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  //Eliminar Rotulo
  const handleEliminar = async (id) => {
    try {
      await eliminarRotulo(id);
      //Actualizar la tabla después de eliminar
      const nuevosDatos = await obtenerRotulo();
      setDataRotulo(nuevosDatos);
    } catch (error) {
      console.log("Error al eliminar rotulo: ", error);
    }
  };

  const handleConfirmar = async (id) => {
    try {
      await confirmarRotulo(id);
      const actualizados = await obtenerRotulo();
      setDataRotulo(actualizados);
    } catch (error) {
      console.error("Error al confirmar: ", error);
    }
  };

  return (
    <>
      <div className="text-end">
        <DialogDemo
          fields={fields}
          title="Rotulo"
          onSubmit={rotuloEditando ? handleUpdate : handleAdd}
          initialData={
            rotuloEditando
              ? { ...rotuloEditando, chequeos: detectarChequeo(rotuloEditando) }
              : null
          }
          onClose={() => {
            setRotuloEditando(null);
            setDialogOpen(false);
          }}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>
      <DataTable
        dynamicFields={{ registros: registrosMP }}
        columns={columnsRotulo(
          handleConfirmar,
          handleEliminar,
          setRotuloEditando,
          setDialogOpen
        )}
        data={dataRotulo}
        filterColumnKey="id"
        placeholder="Buscar por ID"
      />
    </>
  );
}
