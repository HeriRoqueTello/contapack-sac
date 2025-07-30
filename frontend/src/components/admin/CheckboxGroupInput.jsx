import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const CheckboxGroupInput = ({ field }) => {
  const {
 
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { isSubmitted },
  } = useFormContext();

  const selectedValues = watch(field.name) || [];

  useEffect(() => {
    if (field.required && isSubmitted) {
      if (!selectedValues.length) {
        setError(field.name, {
          type: "manual",
          message: "Este campo es obligatorio",
        });
      } else {
        clearErrors(field.name);
      }
    }
  }, [selectedValues, isSubmitted]);

  const handleChange = (option) => {
    const current = getValues(field.name) || [];
    if (current.includes(option)) {
      setValue(
        field.name,
        current.filter((v) => v !== option)
      );
    } else {
      setValue(field.name, [...current, option]);
    }
  };

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
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => handleChange(option)}
              className="w-4 h-4"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
