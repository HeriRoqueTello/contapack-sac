import { useForm, FormProvider } from "react-hook-form";
import { RegInputs } from "@/components/admin/etiqueta/regInputs";
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

export function DialogDemo() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Formulario enviado");
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-40">
        <Button variant="outline">Crear Formulario</Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-[960] max-h-[90vh] overflow-y-auto p-6 rounded-lg">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-center mb-8">
                Registro de Materia Prima
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground" />
            </DialogHeader>

            <RegInputs />

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}



