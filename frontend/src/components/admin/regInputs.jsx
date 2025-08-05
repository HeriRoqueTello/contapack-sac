import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { CheckboxGroupInput } from "./CheckboxGroupInput";
import { RadioGroupInput } from "./RadioGroupInput";
import { StandardInput } from "./StandardInput";
import { PalletFieldsGroup } from "./PalletFieldsGroup";
import { ComboSelectInput } from "./ComboSelectInput";

export const RegInputs = ({ fields, dynamic }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [palletLeft, setPalletLeft] = useState(["izq_0"]);
  const [palletRight, setPalletRight] = useState(["der_0"]);

  // Observa todos los pallets
  const allPallets = watch("pallets") || {};

  // Actualiza palletBlock en el form state cada vez que cambian los pallets
  useEffect(() => {
    const izquierda = palletLeft.map((id) => ({
      id,
      ...(allPallets[id] || {}),
    }));
    const derecha = palletRight.map((id) => ({
      id,
      ...(allPallets[id] || {}),
    }));

    setValue("palletBlock", { izquierda, derecha });
  }, [allPallets, palletLeft, palletRight, setValue]);

  const addPallet = (side) => {
    const id = `${side}_${Date.now()}`;
    side === "izq"
      ? setPalletLeft((prev) => [...prev, id])
      : setPalletRight((prev) => [...prev, id]);
  };

  const removePallet = (side, id) => {
    side === "izq"
      ? setPalletLeft((prev) => prev.filter((x) => x !== id))
      : setPalletRight((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-8">
      {/* Grid adaptable de inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field, index) => {
          // Título de sección
          if (field.type === "sectionTitle") {
            return (
              <h1
                key={`section-${index}`}
                className="text-xl font-semibold text-gray-800 col-span-full"
              >
                {field.label}
              </h1>
            );
          }

          // Bloque de pallets
          if (field.type === "palletBlock") {
            return (
              <div
                key={`pallet-block-${index}`}
                className="col-span-full flex flex-col gap-6 mt-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {field.label}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna Izquierda */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Columna Izquierda
                    </h3>
                    {palletLeft.map((id) => (
                      <PalletFieldsGroup
                        key={id}
                        palletId={id}
                        onRemove={() => removePallet("izq", id)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => addPallet("izq")}
                      className="mt-1 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 transition"
                    >
                      + Añadir a izquierda
                    </button>
                  </div>

                  {/* Columna Derecha */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Columna Derecha
                    </h3>
                    {palletRight.map((id) => (
                      <PalletFieldsGroup
                        key={id}
                        palletId={id}
                        onRemove={() => removePallet("der", id)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => addPallet("der")}
                      className="mt-1 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 transition"
                    >
                      + Añadir a derecha
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Campo tipo combo
          if (field.type === "combo") {
            return (
              <ComboSelectInput
                key={field.name}
                field={field}
                dynamic={dynamic}
              />
            );
          }

          // Campo tipo select
          if (field.type === "select") {
            const options =
              typeof field.options === "function"
                ? field.options({ dynamic })
                : Array.isArray(field.options)
                ? field.options
                : [];
            return (
              <div key={field.name} className="flex flex-col gap-2 mb-4 w-full">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <select
                  {...register(field.name, {
                    required: field.required
                      ? "Este campo es obligatorio"
                      : false,
                  })}
                  id={field.name}
                  className="border border-green-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
                >
                  <option value="">Seleccione una opción</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {errors[field.name] && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors[field.name].message}
                  </span>
                )}
              </div>
            );
          }

          // Inputs normales
          return (
            <div
              key={field.name}
              className={`flex flex-col w-full ${
                field.fullRow ? "col-span-full rounded-lg" : ""
              }`}
            >
              {field.type === "checkboxGroup" && (
                <CheckboxGroupInput field={field} />
              )}
              {field.type === "radioGroup" && <RadioGroupInput field={field} />}
              {![
                "checkboxGroup",
                "radioGroup",
                "sectionTitle",
                "palletBlock",
                "combo",
              ].includes(field.type) && <StandardInput field={field} />}

              {errors[field.name] && (
                <span className="text-sm text-red-500 mt-1">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
