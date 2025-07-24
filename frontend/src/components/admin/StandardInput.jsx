import { useFormContext } from "react-hook-form";

export const StandardInput = ({ field }) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <label
        htmlFor={field.name}
        className="text-sm font-medium text-gray-700 mb-1"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...register(field.name, {
          required: field.required ? "Este campo es obligatorio" : false,
        })}
        type={field.type}
        id={field.name}
        className={`${
          field.type === "checkbox" ? "w-4 h-4 mt-2" : "border p-2"
        } ${
          field.type !== "checkbox" ? "border-green-700" : ""
        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-900`}
      />
    </div>
  );
};
