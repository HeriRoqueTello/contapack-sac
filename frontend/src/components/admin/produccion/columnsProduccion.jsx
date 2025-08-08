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
import { useAuthStore } from "@/store/user-store";

export const columnsProduccion = (
  onConfirmar,
  eliminarRegistro,
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const produccion = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { profile } = useAuthStore();
      const userRole = profile.Rol.descripcion;

      const isEncargado = userRole === "Encargado";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            {isEncargado && (
              <DropdownMenuItem onClick={() => onConfirmar(produccion.id)}>
                {produccion.estado === "Confirmado"
                  ? "No confirmar"
                  : "Confirmar"}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(produccion);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            {isEncargado && (
              <DropdownMenuItem onClick={() => eliminarRegistro(produccion.id)}>
                Eliminar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
];
