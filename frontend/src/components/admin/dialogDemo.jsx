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
  // --- Formateo de fechas, conservado ---
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

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
  const { reset } = methods;

  useEffect(() => {
    if (open) {
      if (initialData) {
        // --- Cambio principal: reconstruir la estructura "pallets" para edición ---
        const pallets = {};
        // si existen columnas izquierda y derecha, reconstruir objetos para react-hook-form
        if (initialData.palletBlock) {
          (initialData.palletBlock.izquierda || []).forEach((p, idx) => {
            pallets[`izq_${idx}`] = p;
          });
          (initialData.palletBlock.derecha || []).forEach((p, idx) => {
            pallets[`der_${idx}`] = p;
          });
        }

        // Inicializar campos con valores existentes
        const formData = {
          ...initialData,
          pallets, // inyectar los pallets reconstruidos
          fecha: formatDate(initialData.fecha),
          fechaProceso: formatDate(initialData.fechaProceso),
          fechaGuia: formatDate(initialData.fechaGuia),
          horaDescarga: formatDateTimeLocal(initialData.horaDescarga),
        };

        // Buscar transporte asociado al registro
        const transporte = dynamic?.transporteDescarga?.find(
          (t) => t.registroMateriaPrimaId === initialData.id
        );

        if (transporte) {
          formData.empTransportes = transporte.id; // si el combo usa ID
          formData.guiaTransportista = transporte.guiaTransportista ?? "";
          formData.chofer = transporte.chofer?.id ?? null;
          formData.licConducir = transporte.chofer?.licencia ?? "";
          formData.placa = transporte.placa ?? "";
          formData.placa2 = transporte.placa2 ?? "";
        }

        // Asegurar que los campos clp y codigo se inicialicen correctamente
        if (initialData.clp) {
          formData.clp = initialData.clp;
        }
        if (initialData.codigo) {
          formData.codigo = initialData.codigo;
        }
        if (initialData.lugReferencia) {
          formData.lugReferencia = initialData.lugReferencia;
        }

        reset(formData);
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

  const handleFormSubmit = (data) => {
    // --- Agrupar pallets en bloques izquierda y derecha ---
    if (data.pallets && typeof data.pallets === "object") {
      const izquierda = [];
      const derecha = [];

      Object.keys(data.pallets).forEach((key) => {
        const pallet = data.pallets[key];
        if (key.startsWith("izq_")) izquierda.push(pallet);
        if (key.startsWith("der_")) derecha.push(pallet);
      });

      // guardar como "palletBlock" para usar en la tabla
      data.palletBlock = { izquierda, derecha };
      delete data.pallets;
    }

    onSubmit?.(data);
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={() => {
            setRegistroEditando?.(null);
            setOpen(true);
          }}
        >
          Crear Formulario
        </Button>
      </div>

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

                  <RegInputs fields={fields} dynamic={dynamic} watch={methods.watch}/>

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
