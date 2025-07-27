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
    accessorKey: "dirReferencia",
    header: "Dirección de Referencia",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("dirReferencia")}</div>
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
    accessorKey: "placa2",
    header: "Placa2",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("placa2")}</div>
    ),
  },
  {
    accessorKey: "horaDescarga",
    header: "Hora de descarga",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("horaDescarga")}</div>
    ),
  },
  {
    accessorKey: "codNumero",
    header: "Código de número",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("codNumero")}</div>
    ),
  },
  {
    accessorKey: "campaña",
    header: "Campaña",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("campaña")}</div>
    ),
  },
  {
    accessorKey: "exportadorId",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Exportador?.nombreEmpresa || "Sin exportador"}
      </div>
    ),
  },
  {
    accessorKey: "numSemana",
    header: "Número de semana",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numSemana")}</div>
    ),
  },
  {
    accessorKey: "ordenVolcado",
    header: "Orden de volcado",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("ordenVolcado")}</div>
    ),
  },
  {
    accessorKey: "fecha",
    header: "Fecha de recepción",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "fechaGuia",
    header: "Fecha de guía",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fechaGuia")}</div>
    ),
  },
  {
    accessorKey: "guiaProductor",
    header: "Guia productor",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaProductor")}</div>
    ),
  },
  {
    accessorKey: "guiaSenasa",
    header: "Guia SENASA",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaSenasa")}</div>
    ),
  },
  {
    accessorKey: "guiaTransportista",
    header: "Guia transportista",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaSenasa")}</div>
    ),
  },
  {
    accessorKey: "glosa",
    header: "Glosa",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("glosa")}</div>
    ),
  },
  {
    accessorKey: "Productor.name",
    header: "Productor/Proveedor",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Productor?.nombre || "Sin productor"}
      </div>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("codigo")}</div>
    ),
  },
  {
    accessorKey: "numIngreso",
    header: "Número de ingreso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numIngreso")}</div>
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
    header: "Cantidad de jabas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cantJabas")}</div>
    ),
  },
  {
    accessorKey: "pesoDescuento",
    header: "Peso descuento",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoDescuento")}</div>
    ),
  },
  {
    accessorKey: "pesoGuia",
    header: "Peso según Guía",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoGuia")}</div>
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
    accessorKey: "responsable",
    header: "Responsable",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("responsable")}</div>
    ),
  },
  {
    accessorKey: "empTransportes",
    header: "Empresa de transportes",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("empTransportes")}</div>
    ),
  },
  {
    accessorKey: "chofer",
    header: "Chofer",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("chofer")}</div>
    ),
  },
  {
    accessorKey: "licConducir",
    header: "Licencia de conducir",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("licConducir")}</div>
    ),
  },
  {
    accessorKey: "obs",
    header: "Observaciones",
    cell: ({ row }) => <div className="text-center">{row.getValue("obs")}</div>,
  },
  {
    accessorKey: "descargado",
    header: "Operario de descarga",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("descargado")}</div>
    ),
  },
  {
    accessorKey: "detServicio",
    header: "Detalle servicio",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("detServicio")}</div>
    ),
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

            <DropdownMenuItem onClick={() => onConfirmar(lote.id)}>
              {lote.estado === "Confirmado" ? "No confirmar" : "Confirmar"}
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
