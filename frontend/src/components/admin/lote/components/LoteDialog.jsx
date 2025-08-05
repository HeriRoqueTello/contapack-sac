import { DialogDemo } from "@/components/admin/dialogDemo";

/**
 * Componente de diálogo para lotes
 */
export function LoteDialog({
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
      title="Registro de Lote"
      onSubmit={onSubmit}
      initialData={initialData}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    />
  );
} 