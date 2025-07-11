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

export const columnsEtiqueta = [

  {
    accessorKey: "id",
    header: () => null,
    cell: () => null, // oculta la celda
    enableHiding: false, // evita que aparezca en el menú de columnas
  },


  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <div className="capitalize">{row.getValue("estado")}</div>,
  },
  {
    accessorKey: "exportador",
    header: "Exportador",
  },
  {
    accessorKey: "codLote",
    header: "Lote",
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
  },
  {
    accessorKey: "calibre",
    header: "Calibre",
  },
  {
    accessorKey: "pesoUni",
    header: "Peso por unidad",
  },
  {
    accessorKey: "codEmp",
    header: "Código de Empaque",
  },
  {
    accessorKey: "clp",
    header: "CLP",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "trazabilidad",
    header: "Trazabilidad",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const etiqueta = row.original
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
              onClick={() => navigator.clipboard.writeText(etiqueta.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



