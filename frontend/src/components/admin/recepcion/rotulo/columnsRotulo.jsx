import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { detectarChequeo } from "@/utils/chequeosUtils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columnsRotulo = (
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
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "Productor.nombre", //accede al nombre dentro del objeto Productor
    header: "Productor/Proveedor",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Productor?.nombre || "Sin productor"}
      </div>
    ),
  },
  {
    accessorKey: "kgIngresados",
    header: "KG Ingresados",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("kgIngresados")}</div>
    ),
  },
  {
    accessorKey: "Producto.name",
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.nombre || "Sin producto"}
      </div>
    ),
  },
  {
    accessorKey: "Producto.Variedad.nombre",
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.Variedad?.nombre || "Sin variedad"}
      </div>
    ),
  },
  {
    accessorKey: "numIngreso",
    header: "N° Ingreso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numIngreso")}</div>
    ),
  },
  {
    accessorKey: "Exportador.nombreEmpresa",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Exportador?.nombreEmpresa || "Sin exportador"}
      </div>
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
    accessorKey: "trazRecepcion",
    header: "Trazabilidad Recepción",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("trazRecepcion")}</div>
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
    accessorKey: "pesoJabaBandeja",
    header: "Peso Jaba/Bandeja",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoJabaBandeja")}</div>
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
    accessorKey: "obs",
    header: "Observaciones",
    cell: ({ row }) => <div className="text-center">{row.getValue("obs")}</div>,
  },
  {
    accessorKey: "chequeos",
    header: "Chequeos",
    cell: ({ row }) => {
      const registro = row.original;
      const valor = detectarChequeo(registro);
      return <div className="text-center">{valor || "—"}</div>;
    },
  },
  {
    accessorKey: "registroMateriaPrimaId",
    header: "Lote asociado",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("registroMateriaPrimaId")}
      </div>
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

            <DropdownMenuItem onClick={() => onConfirmar(rotulo.id)}>
              {rotulo.estado === "Confirmado" ? "No confirmar" : "Confirmar"}
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


