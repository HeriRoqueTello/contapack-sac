import { useForm, FormProvider } from "react-hook-form";
import { RegInputs } from "@/components/admin/regInputs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().split("T")[0];
  };

  const methods = useForm();
  const { reset } = methods;

  // Este useEffect prepara los datos del formulario, tanto para crear como para editar.
  useEffect(() => {
    // Solo se ejecuta si el diálogo está abierto.
    if (open) {
      if (initialData) {
        // --- MODO EDICIÓN: Rellenar el formulario con datos existentes ---
        // Se asegura de que tanto los datos iniciales como los dinámicos estén presentes.
        let dataParaFormulario = { ...initialData };

        // LÓGICA PARA PRODUCCIÓN
        if (title.includes("Producción")) {
          const etiqueta = initialData.etiqueta || {};
          const producto = etiqueta.Producto || {};
          const variedad = etiqueta.Variedad || {};
          const pallet = initialData.pallets?.[0] || {};
          const empaque = pallet.empaque?.[0] || {};
          
          dataParaFormulario = {
            ...initialData,
            productoNombre: producto.nombre,
            productoVariedad: variedad.nombre,
            productoCalibre: etiqueta.calibre,
            productoCategoria: etiqueta.categoria,
            etiquetaNumero: etiqueta.id,
            palletNumero: pallet.numeropallet,
            palletCantidad: pallet.cantidad,
            palletPeso: pallet.peso,
            empaqueFecha: formatDate(empaque.fecha),
            empaquePeso: empaque.peso,
            empaqueTipo: empaque.tipoEmpaques?.[0]?.tipo,
          };
        }

        // LÓGICA PARA ETIQUETA
        if (title.includes("Etiqueta")) {
          dataParaFormulario = {
            ...initialData,
            productor: initialData.Productor?.clp,
            exportador: initialData.Exportador?.nombreEmpresa,
            producto: initialData.Producto?.nombre,
            variedad: initialData.Variedad?.nombre,
            fechaEmp: formatDate(initialData.fechaEmp),
          };
        }

        reset(dataParaFormulario);
      } else {
        // --- MODO CREACIÓN: Rellenar el formulario con valores por defecto ---
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
  }, [open, initialData, fields, reset, title, dynamic]);

  // Esta función se ejecuta al enviar el formulario.
  // Prepara los datos para enviarlos al backend.
  const handleFormSubmit = (data) => {
    let datosParaEnviar = data;

    // LÓGICA PARA PRODUCCIÓN
    if (title.includes("Producción")) {
      datosParaEnviar = {
        fecha: data.fecha,
        estado: data.estado,
        etiqueta: {
          id: data.etiquetaNumero,
        },
        // producto: {
        //   nombre: data.productoNombre,
        //   variedad: data.productoVariedad,
        //   calibre: data.productoCalibre,
        //   categoria: data.productoCategoria,
        // },
        pallet: {
          numero: data.palletNumero,
          cantidad: data.palletCantidad,
          peso: data.palletPeso,
        },
        empaque: {
          fecha: data.empaqueFecha,
          peso: data.empaquePeso,
          tipo: data.empaqueTipo,
        },
      };
    }

    // LÓGICA PARA ETIQUETA
    if (title.includes("Etiqueta")) {
      datosParaEnviar = {
        productor: { clp: data.productor },
        exportador: { nombreEmpresa: data.exportador },
        producto: { nombre: data.producto },
        variedad: { nombre: data.variedad },
        calibre: data.calibre,
        categoria: data.categoria,
        trazabilidad: data.trazabilidad,
        destino: data.destino,
        fechaEmp: data.fechaEmp,
        estado: data.estado || "No Confirmado",
      };
    }

    onSubmit?.(datosParaEnviar);
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={() => {
            // Limpiamos cualquier dato de edición anterior al abrir para crear
            reset({});
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
            if (!value) onClose?.();
            setOpen(value);
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
