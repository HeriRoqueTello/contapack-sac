import { useFormContext } from "react-hook-form";
import { Trash } from "lucide-react";

export const PalletFieldsGroup = ({ palletId, onRemove }) => {
  const { register } = useFormContext();
  const baseName = `pallets.${palletId}`;

  return (
    <div className="relative grid grid-cols-2 gap-4 border p-4 rounded-md shadow-sm mt-2">
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <div className="p-1 bg-red-100 rounded-full hover:bg-red-200">
            <Trash size={18} />
          </div>
        </button>
      )}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">N°Pallet</label>
        <input
          {...register(`${baseName}.numero`)}
          type="text"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">CAT</label>
        <input
          {...register(`${baseName}.cat`)}
          type="text"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Temperatura</label>
        <input
          {...register(`${baseName}.temperatura`)}
          type="text"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Cantidad</label>
        <input
          {...register(`${baseName}.cantidad`)}
          type="text"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <input
          {...register(`${baseName}.obs`)}
          type="text"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
        />
      </div>
    </div>
  );
};
