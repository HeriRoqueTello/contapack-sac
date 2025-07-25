import { useForm, FormProvider } from "react-hook-form";
import { RegInputs } from "@/components/admin/regInputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { useEffect } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";

export function DialogDemo({
  title,
  fields,
  dynamic,
  onSubmit,
  open,
  setOpen,
  initialData,
  onClose,
}) {

  //Para los campos solo con fecha
  const formatDate = (isoString) => {
    if (!isoString) return "";
      return isoString.split("T")[0]; // "YYYY-MM-DD"
  }; 

  //para los campos de fecha con hora
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

  const methods = useForm();
  const { reset} = methods;

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        fecha: formatDate(initialData.fecha),
        fechaProceso: formatDate(initialData.fechaProceso),
        fechaGuia: formatDate(initialData.fechaGuia),
        horaDescarga: formatDateTimeLocal(initialData.horaDescarga),
      });
    } else {
      reset({
        estado: "No Confirmado",
        fecha: formatDate(new Date().toISOString()),
        fechaProceso: "",
      });
    }
  }, [initialData, reset]);

  const agruparPallets = (pallets) => {
    const izquierda = [],
      derecha = [];
    Object.entries(pallets || {}).forEach(([key, value]) => {
      key.startsWith("izq") && izquierda.push(value);
      key.startsWith("der") && derecha.push(value);
    });
    return { izquierda, derecha };
  };

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

  return (
    <>
      <div className="mb-4 text-end">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Crear Formulario
        </Button>
      </div>

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

                <RegInputs fields={fields} dynamic={dynamic}/>

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
    </>
  );
}
