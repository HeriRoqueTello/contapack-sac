import { useForm, FormProvider } from "react-hook-form";
import { RegInputs } from "@/components/admin/regInputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function DialogDemo({ title, fields }) {
  const [open, setOpen] = useState(false);
  const methods = useForm();
  const { reset } = methods;

  // Agrupar pallets por lado
  const agruparPallets = (pallets) => {
    const izquierda = [],
      derecha = [];

    Object.entries(pallets || {}).forEach(([key, value]) => {
      key.startsWith("izq") && izquierda.push(value);
      key.startsWith("der") && derecha.push(value);
    });

    return { izquierda, derecha };
  };

  // ✅ Enviar datos agrupados
  const onSubmit = (data) => {
    const { pallets, ...resto } = data;
    const palletsAgrupados = agruparPallets(pallets);

    const datosFinales = {
      ...resto,
      pallets: palletsAgrupados,
    };

    console.log(datosFinales);
    alert("Formulario enviado");
  };

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-40">
        <Button variant="outline">Crear Formulario</Button>
      </DialogTrigger>

      {/* Modal con layout limpio, ancho y padding */}
      <DialogContent className="w-full !max-w-[95vw] max-h-[90vh] overflow-y-auto bg-white p-0 rounded-2xl shadow-xl">
        <div className="w-full px-4 py-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle className="text-3xl text-center mb-8">
                  {title}
                </DialogTitle>
              </DialogHeader>

                <RegInputs fields={fields} />

              <DialogFooter className="mt-8 flex justify-end gap-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
