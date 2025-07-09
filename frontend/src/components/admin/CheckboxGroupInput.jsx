import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const CheckboxGroupInput = ({ field }) => {
  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { isSubmitted },
  } = useFormContext();

  const watchedValues = watch(field.name); 

  useEffect(() => {
    if (field.required) {
      const isValid = Object.values(watchedValues || {}).some(
        (v) => v === true
      );

      if (isSubmitted) {
        if (!isValid) {
          setError(field.name, {
            type: "manual",
            message: "Este campo es obligatorio",
          });
        } else {
          clearErrors(field.name);
        }
      } else {
        clearErrors(field.name);
      }
    }
  }, [watchedValues, isSubmitted]);

  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <span className="text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <div className="flex flex-row gap-6 flex-wrap justify-center mt-2">
        {field.options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register(`${field.name}.${option}`)}
              className="w-4 h-4"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
