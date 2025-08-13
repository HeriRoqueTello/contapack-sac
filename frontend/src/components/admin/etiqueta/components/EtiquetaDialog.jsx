import { DialogDemo } from "../../dialogDemo";

/**
 * Componente de diálogo para etiqueta
 */

export function EtiquetaDialog({
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
      title="Registro Etiqueta"
      onSubmit={onSubmit}
      initialData={initialData}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    />
  );
}
