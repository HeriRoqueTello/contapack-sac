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

export const columnsAnexo = (onConfirmar, onEliminar) => [
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
      const lote = row.original;
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
              <DropdownMenuItem onClick={() => onConfirmar(lote.id)}>
                Confirmar
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>Editar</DropdownMenuItem>
            {isEncargado && (
              <DropdownMenuItem onClick={() => onEliminar(lote.id)}>
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
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "empacadora",
    header: "Empacadora",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empacadora")}</div>
    ),
  },
  {
    accessorKey: "producto",
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("producto")}</div>
    ),
  },
  {
    accessorKey: "inspector",
    header: "Inspector",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("inspector")}</div>
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
    accessorKey: "clp",
    header: "CLP",
    cell: ({ row }) => <div className="text-center">{row.getValue("clp")}</div>,
  },
  {
    accessorKey: "guiaRem",
    header: "N° Guia Remisión",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaRem")}</div>
    ),
  },
  {
    accessorKey: "responsable",
    header: "Responsable",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("responsable")}</div>
    ),
  },
  {
    accessorKey: "codLote",
    header: "Codigo de Lote",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("codLote")}</div>
    ),
  },
  {
    accessorKey: "jabasBines",
    header: "N° de Jabas/Bines",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("jabasBines")}</div>
    ),
  },
  {
    accessorKey: "pesoTotal",
    header: "Peso Total",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoTotal")}</div>
    ),
  },
  {
    accessorKey: "cantCajas",
    header: "Cantidad de Cajas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cantidad de Cajas")}</div>
    ),
  },
  {
    accessorKey: "pesoEnv",
    header: "Peso Total de Envio",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoEnv")}</div>
    ),
  },
  {
    accessorKey: "cajasMuest",
    header: "N° Cajas a muestraer",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cajasMuest")}</div>
    ),
  },
  {
    accessorKey: "variedad",
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("variedad")}</div>
    ),
  },
  {
    accessorKey: "kg",
    header: "KG",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Present")}</div>
    ),
  },
];
