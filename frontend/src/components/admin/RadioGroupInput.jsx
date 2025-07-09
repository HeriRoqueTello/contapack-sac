import { Controller, useFormContext } from "react-hook-form";

export const RadioGroupInput = ({ field }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required ? "Este campo es obligatorio" : false,
      }}
      render={({ field: controllerField }) => (
        <div className="flex flex-col gap-2 mb-4 w-full">
          <span className="text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </span>
          <div className="flex flex-row gap-6 flex-wrap justify-center mt-2">
            {field.options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  checked={controllerField.value === option}
                  onChange={() =>
                    controllerField.value === option
                      ? controllerField.onChange("")
                      : controllerField.onChange(option)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
};
