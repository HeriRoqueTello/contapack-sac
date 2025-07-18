import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export const columnsEmbarque = (
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
  { accessorKey: "cliente", header: "Cliente", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("cliente")}</div> },

  { accessorKey: "fecha", header: "Fecha", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("fecha")}</div> },

  { accessorKey: "nrContenedor", header: "N° Contenedor", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("nrContenedor")}</div> },

  { accessorKey: "puntosCheck", header: "Puntos chequeados", 
    cell: ({ row }) => 
    <div className="text-center">{Array.isArray(row.getValue("puntosCheck")) ? 
      row.getValue("puntosCheck").join(", ") : row.getValue("puntosCheck")}</div> },

  { accessorKey: "inspector", header: "Inspector", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("inspector")}</div> },

  { accessorKey: "contenedorLimp", header: "Contenedor limpio", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("contenedorLimp")}</div> },

  { accessorKey: "roturasContenedor", header: "Roturas internas", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("roturasContenedor")}</div> },

  { accessorKey: "obs", header: "Observaciones", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("obs")}</div> },

  { accessorKey: "precintos", header: "Precintos", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("precintos")}</div> },

  { accessorKey: "cortinAire", header: "Cortina de aire", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("cortinAire")}</div> },

  { accessorKey: "termoRegistro", header: "Termo registro", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("termoRegistro")}</div> },

  { accessorKey: "trazabilidadComp", header: "Trazabilidad completa", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("trazabilidadComp")}</div> },

  { accessorKey: "palletsComp", header: "Pallets completos", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("palletsComp")}</div> },

  { accessorKey: "documentacionComp", header: "Documentación completa", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("documentacionComp")}</div> },

  { accessorKey: "hInicial", header: "Hora inicial", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("hInicial")}</div> },

  { accessorKey: "hFinal", header: "Hora final", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("hFinal")}</div> },

  { accessorKey: "precintOPlanta", header: "Precinto Planta", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("precintOPlanta")}</div> },

  { accessorKey: "precintoAduana", header: "Precinto Aduana", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("precintoAduana")}</div> },

  { accessorKey: "precintoLinea", header: "Precinto Línea", 
    cell: ({ row }) => 
    <div className="text-center">{row.getValue("precintoLinea")}</div> },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const embarque = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          
            <DropdownMenuItem onClick={() => onConfirmar(embarque.id)}>
              {embarque.estado === "Confirmado" ? "No confirmar" : "Confirmar"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(embarque);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
    
            <DropdownMenuItem onClick={() => onEliminar?.(embarque.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

