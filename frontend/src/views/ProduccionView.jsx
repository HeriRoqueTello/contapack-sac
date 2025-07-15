import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/produccion/fieldsProduccion";

export function ProduccionView() {
  return (
    <div className="text-end">
      <DialogDemo fields={fields} title="Registro de Producción Diaria" />
    </div>
  );
}
