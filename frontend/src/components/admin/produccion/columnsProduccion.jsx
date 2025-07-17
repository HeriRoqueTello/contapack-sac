import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export const columnsProduccion = (onConfirmar) => [
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
     </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
      />
    </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "nrPallet",
    header: "Número de Pallet",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("nrPallet")}</div>
    ),
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("categoria")}</div>
    ),
  },
  {
    accessorKey: "calibre",
    header: "Calibre",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("calibre")}</div>
    ),
  },
  {
    accessorKey: "tipEmp",
    header: "Tipo de empaque",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("tipEmp")}</div>
    ),
  },
  {
    accessorKey: "pesoEmp",
    header: "Peso por empaque",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoEmp")}</div>
    ),
  },
  {
    accessorKey: "cantEmp",
    header: "Cantidad de empaques",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cantEmp")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const produccion = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(produccion.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onConfirmar(produccion.id)}>
              Confirmar R
            </DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
