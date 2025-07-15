import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/recepcion/rotulo/fieldsRotulo";

export function RotuloView() {
  return (
    <div className="text-end">
      <DialogDemo fields={fields} title="Rótulo" />
    </div>
  );
}
