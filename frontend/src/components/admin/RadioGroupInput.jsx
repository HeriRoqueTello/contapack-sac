import { Controller, useFormContext } from "react-hook-form";

export const RadioGroupInput = ({ field }) => {
  const { control } = useFormContext();
  const isFullRow = field.fullRow;

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required ? "Este campo es obligatorio" : false,
      }}
      render={({ field: controllerField }) => (
        <div className="flex flex-col gap-2 mb-6 w-full">
          {/* Label para radioGroup normal */}
          {!isFullRow && (
            <span
              className={`font-semibold text-gray-800 text-left ${
                isFullRow ? "text-2xl" : "text-sm"
              }`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          )}

          {/* Fila delgada solo para asterisco en fullRow */}
          {isFullRow && field.required && (
            <div className="h-0">
              <span className="text-red-500 text-sm font-semibold pl-2">*</span>
            </div>
          )}

          {/* Grupo de opciones */}
          <div
            className={`flex items-center flex-wrap justify-center ${
              isFullRow ? "gap-12 mt-2" : "gap-6 mt-6"
            }`}
          >
            {field.options.map((option) => (
              <label key={option} className="flex items-center gap-4">
                <input
                  type="radio"
                  value={option}
                  checked={controllerField.value === option}
                  onChange={() =>
                    controllerField.value === option
                      ? controllerField.onChange("")
                      : controllerField.onChange(option)
                  }
                  className={`accent-green-700 ${
                    isFullRow ? "w-6 h-6" : "w-4 h-4"
                  }`}
                />
                <span
                  className={`text-gray-900 leading-none ${
                    isFullRow ? "text-xl font-semibold" : "text-sm"
                  }`}
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
};
