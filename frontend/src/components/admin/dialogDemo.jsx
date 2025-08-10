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

        // extrae primer pallet (si viene en initialData.pallets como array)
        const pallet =
          (initialData.pallets && initialData.pallets[0]) ||
          initialData.pallet ||
          {};
        const empaque = (pallet.empaque && pallet.empaque[0]) || {};

        // Inicializar campos con valores existentes
        const formData = {
          ...initialData,
          pallets,
          // fecha: formatDate(initialData.fecha),
          fechaProceso: formatDate(initialData.fechaProceso),
          fechaGuia: formatDate(initialData.fechaGuia),
          horaDescarga: formatDateTimeLocal(initialData.horaDescarga),
          // pallet -> campos planos
          numeroPallet: pallet.numeropallet ?? initialData.numeropallet ?? "",
          cantidadPallet: pallet.cantidad ?? initialData.cantidad ?? "",
          pesoPallet: pallet.peso ?? initialData.peso ?? "",
          posicionPallet: pallet.posicion ?? initialData.posicion ?? "",
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

        // --- Añadir esto para manejar el producto al editar ---
        if (initialData.producto) {
          formData.productoNombre = initialData.producto.nombre;
          // Asumimos que el backend devuelve el objeto completo con las relaciones
          formData.productoVariedad =
            initialData.producto.variedad?.nombre ?? "";
          formData.productoCalibre = initialData.producto.calibre?.nombre ?? "";
          formData.productoCategoria =
            initialData.producto.categoria?.nombre ?? "";
        }
        if (empaque) {
          formData.empaqueFecha = formatDate(empaque.fecha);
          formData.empaqueTipo = empaque.tipoEmpaques?.[0]?.tipo ?? "";
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
        // inicializar los campos de pallet también (por si no están en fields)
        emptyValues.palletNumero = "";
        emptyValues.palletCantidad = "";
        emptyValues.palletPeso = "";
        emptyValues.empaqueFecha = formatDate(new Date().toISOString());
        emptyValues.empaqueTipo = "Cajas";
        emptyValues.empaquePeso = "";
        // --- Añadir esto para inicializar los campos del producto al crear ---
        emptyValues.productoNombre = "";
        emptyValues.productoVariedad = "";
        emptyValues.productoCalibre = "";
        emptyValues.productoCategoria = "";

        reset(emptyValues);
      }
    }
  }, [open, initialData, fields, reset]);

  const handleFormSubmit = (data) => {
    const datosParaEnviar = {
      // Pasamos los campos que pertenecen a RegistroProduccion
      fecha: data.fecha,
      estado: data.estado,

      // Creamos el objeto anidado 'producto'
      producto: {
        nombre: data.productoNombre,
        variedad: data.productoVariedad,
        calibre: data.productoCalibre,
        categoria: data.productoCategoria,
      },
      // Creamos el objeto anidado 'pallet'
      pallet: {
        numero: data.palletNumero,
        cantidad: data.palletCantidad,
        peso: data.palletPeso,
      },
      // Creamos el objeto anidado 'empaque'
      empaque: {
        fecha: data.empaqueFecha,
        peso: data.empaquePeso,
        tipo: data.empaqueTipo,
      },
    };

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
