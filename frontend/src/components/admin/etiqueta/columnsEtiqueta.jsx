import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columnsEtiqueta = (
  onConfirmar,
  onEliminar,
  setRegistroEditando,
  setDialogOpen
) => [
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
    enableHiding: false,
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
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "exportador",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("exportador")}</div>
    ),
  },
  {
    accessorKey: "codLote",
    header: "Lote",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("codLote")}</div>
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
    accessorKey: "pesoUni",
    header: "Peso por unidad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoUni")}</div>
    ),
  },
  {
    accessorKey: "codEmp",
    header: "Código de Empaque",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("codEmp")}</div>
    ),
  },
  {
    accessorKey: "clp",
    header: "CLP",
    cell: ({ row }) => <div className="text-center">{row.getValue("clp")}</div>,
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "trazabilidad",
    header: "Trazabilidad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("trazabilidad")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const etiqueta = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            
            <DropdownMenuItem onClick={() => onConfirmar(etiqueta.id)}>
              {etiqueta.estado === "Confirmado" ? "No confirmar" : "Confirmar"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(etiqueta);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEliminar(etiqueta.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
