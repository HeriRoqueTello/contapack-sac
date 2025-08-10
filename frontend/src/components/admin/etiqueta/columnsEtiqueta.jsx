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

export const columnsEtiqueta = (
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
            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(etiqueta);
                setDialogOpen(true);
              }}
            >
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
      <div className="text-center ">{row.getValue("estado")}</div>
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
    accessorKey: "Exportador.nombreEmpresa",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Exportador?.nombreEmpresa || "Sin exportador"}
      </div>
    ),
  },


  {
    accessorKey: "Producto.nombre",
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.nombre || "Sin producto"}
      </div>
    ),
  },

   {
    accessorKey: "Calibre.nombre", 
    header: "Calibre",

    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Calibre?.nombre || ""}
      </div>
    ),
  },
  {
    accessorKey: "Categoria.nombre", 
    header: "Categoría",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Categoria?.nombre || ""}
      </div>
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
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fechaEmp")}</div>
    ),
  },    

  {
    accessorKey: "destino",
    header: "Destino",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("destino")}</div>
    ),
  },    
];
