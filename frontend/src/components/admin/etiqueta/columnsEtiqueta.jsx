import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columnsEtiqueta = (onConfirmar, onEliminar, onEditar) => [
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
            <DropdownMenuItem onClick={() => onEditar(etiqueta)}>
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
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "Productor.clp",
    header: "CLP",
    cell: ({ row }) => (
      <div className="text-center">{row.original.Productor?.clp || "N/A"}</div>
    ),
  },
  {
    accessorKey: "Exportador.nombreEmpresa",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Exportador?.nombreEmpresa || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "Producto.nombre",
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.nombre || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "Variedad.nombre", // AÑADIDO: Nueva columna para Variedad
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Variedad?.nombre || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "calibre", // CAMBIADO: Ahora es un campo directo
    header: "Calibre",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("calibre")}</div>
    ),
  },
  {
    accessorKey: "categoria", // CAMBIADO: Ahora es un campo directo
    header: "Categoría",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("categoria")}</div>
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
    accessorKey: "fechaEmp",
    header: "Fecha de Empaque",
    cell: ({ row }) => {
      // Formateamos la fecha para mostrarla legible
      const fecha = row.getValue("fechaEmp");
      if (!fecha) return "N/A";
      try {
        return new Date(fecha).toLocaleDateString("es-PE", { timeZone: "UTC" });
      } catch (e) {
        return "Fecha inválida", e;
      }
    },
  },
  {
    accessorKey: "destino",
    header: "Destino",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("destino")}</div>
    ),
  },
];
