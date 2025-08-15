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
import { useEffect } from "react";

export function DialogDemo({
  title,
  fields,
  dynamic,
  onSubmit, // La función que viene del componente padre (ej. LoteView)
  open,
  setOpen,
  initialData,
  onClose,
}) {
  const methods = useForm();
  const { reset, handleSubmit, setValue, watch } = methods;
  // --- INICIO DE LA LÓGICA DE AUTOCOMPLETADO ---
  const selectedLoteId = watch("registroMateriaPrimaId");

  useEffect(() => {
    if (selectedLoteId && dynamic?.registrosMP) {
      const selectedLote = dynamic.registrosMP.find(
        (lote) => lote.id === parseInt(selectedLoteId, 10)
      );

      if (selectedLote) {
        console.log("Estructura del Lote seleccionado:", selectedLote);

        // Formatear la fecha
        const formattedDate = selectedLote.fecha
          ? new Date(selectedLote.fecha).toISOString().split("T")[0]
          : "";

        // Autocompletar los campos del formulario
        setValue("fecha", formattedDate);
        setValue("productorId", selectedLote.productorId);
        setValue("numIngreso", selectedLote.numIngreso);
        setValue("exportadorId", selectedLote.exportadorId);

        if (
          selectedLote.Productor &&
          Array.isArray(selectedLote.Productor.responsables) &&
          selectedLote.Productor.responsables.length > 0
        ) {
          setValue(
            "responsable",
            selectedLote.Productor.responsables[0].nombre
          );
        } else {
          setValue("responsable", "No asignado");
        }
      }
    }
  }, [selectedLoteId, dynamic, setValue]);

  const formatDate = (dateValue) => {
    // Si el valor es nulo o indefinido, devuelve una cadena vacía.
    if (!dateValue) return "";

    // Intenta crear un objeto Date.
    const date = new Date(dateValue);

    // Si la fecha creada no es válida (ej. por un formato incorrecto), devuelve una cadena vacía.
    if (isNaN(date.getTime())) {
      return "";
    }

    // Si es válida, la formatea a YYYY-MM-DD.
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (open) {
      if (initialData) {
        const formattedData = { ...initialData };
        // Itera sobre los campos definidos para el formulario
        fields.forEach((field) => {
          // Si el campo es de tipo 'date' y existe en los datos iniciales
          if (field.type === "date" && formattedData[field.name]) {
            // Formatea su valor
            formattedData[field.name] = formatDate(formattedData[field.name]);
          }
        });

        const {
          responsableId,
          guiaProductorId,
          etiquetaNumero,
          ...dataPrincipal
        } = formattedData;
        reset(dataPrincipal);

        setTimeout(() => {
          if (responsableId !== undefined) {
            setValue("responsableId", responsableId);
          }
          if (guiaProductorId !== undefined) {
            setValue("guiaProductorId", guiaProductorId);
          }
          if (etiquetaNumero !== undefined) {
            setValue("etiquetaNumero", etiquetaNumero);
          }
        }, 50);
      } else {
        const defaultValues = {};
        fields.forEach((field) => {
          if (field.type === "date") {
            defaultValues[field.name] = formatDate(new Date());
          } else {
            defaultValues[field.name] = field.defaultValue || "";
          }
        });
        reset(defaultValues);
      }
    }
  }, [open, initialData, fields, reset, setValue]);

  const handleDialogClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleFormSubmit = (data) => {
    onSubmit?.(data);
    handleDialogClose();
  };

  return (
    <>
      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={() => {
            onClose?.();
            setOpen(true);
          }}
        >
          Crear Formulario
        </Button>
      </div>

      {open && (
        <Dialog
          open={open}
          onOpenChange={(value) => !value && handleDialogClose()}
        >
          <DialogContent className="w-full !max-w-[95vw] max-h-[90vh] overflow-y-auto bg-white p-0 rounded-2xl shadow-xl">
            <div className="w-full px-4 py-6">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-center mb-8">
                      {title}
                    </DialogTitle>
                  </DialogHeader>
                  <RegInputs
                    fields={fields}
                    dynamic={dynamic}
                    watch={methods.watch}
                  />
                  <DialogFooter className="mt-8 flex justify-end gap-4">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleDialogClose}
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
