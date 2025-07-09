import { TableEtiqueta } from "@/components/admin/etiqueta/taetiqueta";
import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/etiqueta/fieldsEtiqueta";

export function TaEtiquetaView() {
  return (
    <>
      <div className="text-end">
        <DialogDemo fields={fields} title="Registro de Etiqueta" />
      </div>
      <TableEtiqueta />
    </>
  );
}
