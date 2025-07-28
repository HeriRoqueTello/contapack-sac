import { useForm, FormProvider } from "react-hook-form";
import { RegInputs } from "@/components/admin/regInputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";

/**
 * Componente DialogDemo
 * Muestra un formulario en un diálogo modal para crear o editar registros.
 */
export function DialogDemo({
  title,
  fields,
  dynamic,
  onSubmit,
  open,
  setOpen,
  initialData,
  onClose,
  setRegistroEditando,
}) {
  // --- Utilidades para formatear fechas ---
  // Formatea fecha tipo ISO a "YYYY-MM-DD"
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

  // Formatea fecha tipo ISO a "YYYY-MM-DDTHH:mm" para inputs datetime-local
  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const pad = (n) => n.toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  // --- Instancia de react-hook-form ---
  const methods = useForm();
  const { reset } = methods;

  /**
   * Efecto para resetear el formulario cada vez que cambia initialData.
   * Si hay datos para editar, los carga y formatea las fechas.
   * Si no, inicializa el formulario con valores vacíos o por defecto.
   */
  useEffect(() => {
    if (open) {
      console.log("initialData:", initialData);
      if (initialData) {
        reset({
          ...initialData,
          fecha: formatDate(initialData.fecha),
          fechaProceso: formatDate(initialData.fechaProceso),
          fechaGuia: formatDate(initialData.fechaGuia),
          horaDescarga: formatDateTimeLocal(initialData.horaDescarga),
        });
      } else {
        const emptyValues = {};
        fields.forEach((field) => {
          emptyValues[field.name] =
            field.name === "estado"
              ? "No Confirmado"
              : field.name === "fecha"
              ? formatDate(new Date().toISOString())
              : "";
        });
        reset(emptyValues);
      }
    }
  }, [open, initialData, fields, reset]);

  /**
   * Agrupa los datos de pallets por lado (izquierda/derecha).
   */
  const agruparPallets = (pallets) => {
    const izquierda = [],
      derecha = [];
    Object.entries(pallets || {}).forEach(([key, value]) => {
      key.startsWith("izq") && izquierda.push(value);
      key.startsWith("der") && derecha.push(value);
    });
    return { izquierda, derecha };
  };

  /**
   * Maneja el envío del formulario.
   * Agrupa los pallets y envía los datos finales al callback onSubmit.
   */
  const handleFormSubmit = (data) => {
    const { pallets, ...resto } = data;
    const palletsAgrupados = agruparPallets(pallets);
    const datosFinales = {
      ...resto,
      pallets: palletsAgrupados,
    };
    onSubmit?.(datosFinales);
    setOpen(false);
    onClose?.();
  };

  // --- Renderizado ---
  return (
    <>
      {/* Botón SIEMPRE visible, fuera del Dialog */}
      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={() => {
            setRegistroEditando?.(null); // Limpia el registro editando
            setOpen(true); // Abre el diálogo
          }}
        >
          Crear Formulario
        </Button>
      </div>

      {/* Diálogo modal */}
      {open && (
        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);
            if (!value) onClose?.();
          }}
        >
          <DialogContent className="w-full !max-w-[95vw] max-h-[90vh] overflow-y-auto bg-white p-0 rounded-2xl shadow-xl">
            <div className="w-full px-4 py-6">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-center mb-8">
                      {title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Por favor, completa el formulario a continuación.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Inputs dinámicos del formulario */}
                  <RegInputs fields={fields} dynamic={dynamic} />
                  
                  <DialogFooter className="mt-8 flex justify-end gap-4">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onClose?.();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {initialData ? "Actualizar" : "Guardar"}
                    </Button>
                  </DialogFooter>
                </form>
              </FormProvider>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
