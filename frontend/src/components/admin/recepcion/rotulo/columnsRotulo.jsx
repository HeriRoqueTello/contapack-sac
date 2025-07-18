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

export const columnsRotulo = (onConfirmar, onEliminar, setRegistroEditando, setDialogOpen) => [
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
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "prodProv",
    header: "Producto/Proveedor",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("prodProv")}</div>
    ),
  },
  {
    accessorKey: "kgIng",
    header: "KG Ingresados",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("kgIng")}</div>
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
    accessorKey: "variedad",
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("variedad")}</div>
    ),
  },
  {
    accessorKey: "numIng",
    header: "N° Ingreso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numIng")}</div>
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
    accessorKey: "responsable",
    header: "Resposanble",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("responsable")}</div>
    ),
  },
  {
    accessorKey: "bandJabas",
    header: "Bandejas/Jabas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("bandJabas")}</div>
    ),
  },
  {
    accessorKey: "numPallet",
    header: "N° Pallet",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numPallet")}</div>
    ),
  },
  {
    accessorKey: "trazRecep",
    header: "Trazabilidad Recepción",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("trazRecep")}</div>
    ),
  },
  {
    accessorKey: "fechaProceso",
    header: "Fecha de Proceso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fechaProceso")}</div>
    ),
  },
  {
    accessorKey: "pesoJabaBand",
    header: "Peso Jaba/Bandeja",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoJabaBand")}</div>
    ),
  },
  {
    accessorKey: "firma",
    header: "Firma",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("firma")}</div>
    ),
  },
  {
    accessorKey: "descargado",
    header: "Descargado por",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("descargado")}</div>
    ),
  },
  {
    accessorKey: "detServ",
    header: "Detalle Servicio",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("detServ")}</div>
    ),
  },
  {
    accessorKey: "obs",
    header: "Observaciones",
    cell: ({ row }) => <div className="text-center">{row.getValue("obs")}</div>,
  },
  {
    accessorKey: "chequeos",
    header: "Chequeos",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("chequeos")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rotulo = row.original;
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
              onClick={() => navigator.clipboard.writeText(rotulo.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onConfirmar(rotulo.id)}>
              Confirmar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(rotulo);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEliminar(rotulo.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
