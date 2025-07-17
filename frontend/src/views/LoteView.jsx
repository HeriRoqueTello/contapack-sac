import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/recepcion/Lote/fieldsLote";

export function LoteView() {
  return (
    <div className="text-end">
      <DialogDemo fields={fields} title="Registro de Lote" />
    </div>
  );
}
