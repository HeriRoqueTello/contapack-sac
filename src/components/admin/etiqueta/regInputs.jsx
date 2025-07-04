import { useFormContext } from "react-hook-form";

export const RegInputs = () => {
  const fields = [
    { name: "exportador", label: "Exportador" },
    { name: "lote", label: "Lote" },
    { name: "categoría", label: "Categoría" },
    { name: "calibre", label: "Calibre" },
    { name: "peso por unidad", label: "Peso por unidad" },
    { name: "codigo de empaque", label: "Codigo de empaque" },
    { name: "clp", label: "CLP" },
    { name: "fecha", label: "Fecha"},
    { name: "trazabilidad", label: "Trazabilidad" },
  ];

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field, index) => (
        <div key={field.name} className="flex flex-col mb-4">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
            {index !== 13 && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            {...register(field.name, { required: index !== 13 })}
            id={field.name}
            defaultValue={
              field.name === "fecha"
                ? getToday()
                : ""
            }
            className="border border-green-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-900"
          />
          {errors[field.name] && (
            <span className="text-sm text-red-500 mt-1">
              Este campo es obligatorio
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
