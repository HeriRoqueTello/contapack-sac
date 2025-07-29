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
  // --- Selección y acciones ---
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
    enableHiding: false,
  },

  // --- Acciones ---
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
  
  // --- Estado y identificación principal ---
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "lote",
    header: "Lote",
    cell: ({ row }) => (
      <div className="text-center capitalize">{`Lote ${row.original.id}`}</div>
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
  // --- Productor y Exportador ---
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
    accessorKey: "Productor.clp",
    header: "CLP",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Productor?.clp || "Sin CLP"}
      </div>
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
  // --- Campaña y semana ---
  {
    accessorKey: "campaña",
    header: "Campaña",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("campaña")}</div>
    ),
  },
  {
    accessorKey: "numSemana",
    header: "Número de semana",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numSemana")}</div>
    ),
  },
  // --- Fechas principales ---
  {
    accessorKey: "fecha",
    header: "Fecha de recepción",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha")}</div>
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
    accessorKey: "fechaGuia",
    header: "Fecha de guía",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fechaGuia")}</div>
    ),
  },
  // --- Guías asociadas ---
  {
    accessorKey: "guiaProductor",
    header: "Guía productor",
    cell: ({ row }) => {
      const guia =
        row.original?.Productor?.guias?.[0]?.guiaProductor ?? "Sin Guía";
      return <div className="text-center">{guia}</div>;
    },
  },
  {
    accessorKey: "guiaSenasa",
    header: "Guía SENASA",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaSenasa")}</div>
    ),
  },
  {
    accessorKey: "guiaTransportista",
    header: "Guía transportista",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("guiaTransportista")}</div>
    ),
  },
  // --- Vehículo y transporte ---
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
  // --- Pesos y cantidades ---
  {
    accessorKey: "pesoNeto",
    header: "Peso Neto",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pesoNeto")}</div>
    ),
  },
  {
    accessorKey: "pesoGuia",
    header: "Peso según Guía",
    cell: ({ row }) => {
      const valor = row.original.Productor?.guias?.[0]?.pesoGuia ?? "-";
      return <div className="text-center">{valor}</div>;
    },
  },
  {
    accessorKey: "difPeso",
    header: "Diferencia de peso",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("difPeso")}</div>
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
  // --- Otros datos relevantes ---
  {
    accessorKey: "ordenVolcado",
    header: "Orden de volcado",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("ordenVolcado")}</div>
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
    accessorKey: "glosa",
    header: "Glosa",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("glosa")}</div>
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
  
];
