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

export const columnsLote = (
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
    accessorKey: "placa",
    header: "Placa",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("placa")}</div>
    ),
  },
  {
    accessorKey: "horaDesc",
    header: "Hora de descarga",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("horaDesc")}</div>
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
    accessorKey: "numSemana",
    header: "# Semana",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numSemana")}</div>
    ),
  },
  {
    accessorKey: "ordenVolc",
    header: "Orden de Volcado",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("ordenVolc")}</div>
    ),
  },
  {
    accessorKey: "fechaRecep",
    header: "Fecha de recepción",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fechaRecep")}</div>
    ),
  },
  {
    accessorKey: "guiaProd",
    header: "Guía Productor",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaProd")}</div>
    ),
  },
  {
    accessorKey: "prodProv",
    header: "Productor-Proveedor",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("prodProv")}</div>
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
    accessorKey: "clp",
    header: "CLP",
    cell: ({ row }) => <div className="text-center">{row.getValue("clp")}</div>,
  },
  {
    accessorKey: "pesoNeto",
    header: "Peso Neto",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoNeto")}</div>
    ),
  },
  {
    accessorKey: "cantJabas",
    header: "Cantidad de Jabas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cantJabas")}</div>
    ),
  },
  {
    accessorKey: "pesoDesc",
    header: "Peso descuento",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoDesc")}</div>
    ),
  },
  {
    accessorKey: "difPeso",
    header: "Diferencia de peso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("difPeso")}</div>
    ),
  },
  {
    accessorKey: "empTrans",
    header: "Empresa de Transporte",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empTrans")}</div>
    ),
  },
  {
    accessorKey: "licCond",
    header: "Licencia de Conducir",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("licCond")}</div>
    ),
  },
  {
    accessorKey: "obs",
    header: "Observaciones",
    cell: ({ row }) => <div className="text-center">{row.getValue("obs")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const lote = row.original;
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
              onClick={() => navigator.clipboard.writeText(lote.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onConfirmar(lote.id)}>
              Confirmar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(lote);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEliminar(lote.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
