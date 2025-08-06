import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";

export const ComboSelectInput = ({ field, dynamic }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);

  const currentValue = watch(field.name);

  //Escuchar el productorId, por posibles cambios
  //---Aqui se añaden mas si es necesario
  const productorId = useWatch({ name: "productorId" });
  //Cada vez que el productorId o dynamic cambien, se actualiza las opciones
  useEffect(() => {
    const updatedOptions =
      typeof field.options === "function"
        ? field.options({ dynamic, watch })
        : Array.isArray(field.options)
        ? field.options
        : [];

    setOptions(updatedOptions);
  }, [productorId, dynamic]);

  useEffect(() => {
    if (field.multiple && Array.isArray(currentValue)) {
      const selectedOpts = options.filter((opt) =>
        currentValue.includes(opt.value)
      );
      setSelectedItems(selectedOpts);
    } else {
      const selectedOpt = options.find((opt) => opt.value === currentValue);
      setSelectedItems(selectedOpt ? [selectedOpt] : []);
      setInputValue(selectedOpt?.label || "");

      // Forzar la ejecución del onChange cuando se carga un valor inicial (para edición)
      if (selectedOpt && field.onChange) {
        field.onChange({ value: selectedOpt.value, dynamic, setValue, watch });
      }
    }
  }, [currentValue, options]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelectOption = (option) => {
    if (field.multiple) {
      const isSelected = selectedItems.some(
        (item) => item.value === option.value
      );
      const newSelectedItems = isSelected
        ? selectedItems.filter((item) => item.value !== option.value)
        : [...selectedItems, option];

      const newValues = newSelectedItems.map((item) => item.value);
      setSelectedItems(newSelectedItems);
      setValue(field.name, newValues);
      setInputValue("");

      if (field.onChange) {
        field.onChange({ value: newValues, dynamic, setValue });
      }
    } else {
      setSelectedItems([option]);
      setValue(field.name, option.value);
      setInputValue(option.label);
      setIsOpen(false);

      if (field.onChange) {
        field.onChange({ value: option.value, dynamic, setValue });
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newOption = {
        label: inputValue.trim(),
        value: inputValue.trim(),
      };

      // Agregar a opciones si no existe
      const exists = options.some((opt) => opt.value === newOption.value);
      if (!exists) {
        setOptions((prev) => [...prev, newOption]);
      }

      if (field.multiple) {
        const newSelectedItems = [...selectedItems, newOption];
        const newValues = newSelectedItems.map((item) => item.value);
        setSelectedItems(newSelectedItems);
        setValue(field.name, newValues);
        setInputValue("");

        if (field.onChange) {
          field.onChange({ value: newValues, dynamic, setValue });
        }
      } else {
        setSelectedItems([newOption]);
        setValue(field.name, newOption.value);
        setInputValue(newOption.label);
        setIsOpen(false);

        if (field.onChange) {
          field.onChange({ value: newOption.value, dynamic, setValue });
        }
      }
    }
  };

  const handleRemove = (valueToRemove) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.value !== valueToRemove
    );
    setSelectedItems(newSelectedItems);
    setValue(
      field.name,
      newSelectedItems.map((item) => item.value)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        type="hidden"
        id={field.name}
      />

      <div className="relative" ref={inputRef}>
        <div className="border border-green-700 rounded-md bg-white">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={field.placeholder || "Escriba o seleccione..."}
            className="w-full px-3 py-2 text-sm border-none outline-none bg-transparent"
            disabled={field.readOnly}
          />

          {field.multiple && selectedItems.length > 0 && (
            <div className="flex flex-wrap gap-1 px-3 pb-2">
              {selectedItems.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
                >
                  {item.label}
                  <button
                    type="button"
                    onClick={() => handleRemove(item.value)}
                    className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="py-1">
              {filteredOptions.length === 0 && inputValue ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Presiona Enter para agregar “{inputValue}”
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 text-sm hover:bg-green-50 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSelectOption(option)}
                  >
                    <span>{option.label}</span>
                    {selectedItems.some(
                      (item) => item.value === option.value
                    ) && <span className="text-green-600">✓</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {errors[field.name] && (
        <span className="text-sm text-red-500 mt-1">
          {errors[field.name].message}
        </span>
      )}
    </div>
  );
};
