import { DialogDemo } from "@/components/admin/dialogDemo";
import { fields } from "@/components/admin/embarque/fieldsEmbarque";

export function EmbarqueView() {
  return (
    <>
      <div className="text-end">
        <DialogDemo fields={fields} title="Registro de Embarque" />
      </div>
      {/* Aqui iría la tabla de Embarque */}
    </>
  );
}
