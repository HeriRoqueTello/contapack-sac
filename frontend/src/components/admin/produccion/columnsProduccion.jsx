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

      const isEncargado =
        userRole === "Encargado" || userRole === "Administrador";
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
    accessorKey: "productoNombre",
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productoNombre")}</div>
    ),
  },
  {
    accessorKey: "productoVariedad",
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productoVariedad")}</div>
    ),
  },
  {
    accessorKey: "productoCalibre",
    header: "Calibre",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productoCalibre")}</div>
    ),
  },
  {
    accessorKey: "productoCategoria",
    header: "Categoria",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productoCategoria")}</div>
    ),
  },
  {
    accessorKey: "palletNumero",
    header: "N° Pallet",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("palletNumero")}</div>
    ),
  },
  {
    accessorKey: "palletCantidad",
    header: "Cant. Cajas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("palletCantidad")}</div>
    ),
  },
  {
    accessorKey: "palletPeso",
    header: "Peso Pallet (kg)",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("palletPeso")}</div>
    ),
  },
  {
    accessorKey: "empaqueFecha",
    header: "Fecha empaque",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empaqueFecha")}</div>
    ),
  },
  {
    accessorKey: "empaquePeso",
    header: "Peso empaque (kg)",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empaquePeso")}</div>
    ),
  },
  {
    accessorKey: "empaqueTipo",
    header: "Tipo Empaque",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empaqueTipo")}</div>
    ),
  },
];
