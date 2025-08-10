import { DialogDemo } from "../../dialogDemo";

/**
 * Componente de diálogo para producción diaria
 */

export function ProduccionDialog({
  fields,
  dynamicFields,
  onSubmit,
  initialData,
  onClose,
  open,
  setOpen,
}) {
  return (
    <DialogDemo
      fields={fields}
      dynamic={dynamicFields}
      title="Registro de Producción Diaria"
      onSubmit={onSubmit}
      initialData={initialData}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    />
  );
}
