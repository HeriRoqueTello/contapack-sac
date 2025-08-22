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

export const columnsEmbarque = (
  onConfirmar,
  onEliminar,
  setRegistroEditando,
  setDialogOpen,
  handleVerPallets
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
      const embarque = row.original;
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
              <DropdownMenuItem onClick={() => onConfirmar(embarque.id)}>
                {embarque.estado === "Confirmado"
                  ? "No confirmar"
                  : "Confirmar"}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(embarque);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            {isEncargado && (
              <DropdownMenuItem onClick={() => onEliminar?.(embarque.id)}>
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
      <div className="capitalize text-center">{row.getValue("estado")}</div>
    ),
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cliente")}</div>
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
    accessorKey: "nrContenedor",
    header: "N° Contenedor",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("nrContenedor")}</div>
    ),
  },

  {
    accessorKey: "puntosCheck",
    header: "Puntos chequeados",
    cell: ({ row }) => (
      <div className="text-center">
        {Array.isArray(row.getValue("puntosCheck"))
          ? row.getValue("puntosCheck").join(", ")
          : row.getValue("puntosCheck")}
      </div>
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
    accessorKey: "contenedorLimp",
    header: "Contenedor limpio",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("contenedorLimp")}</div>
    ),
  },

  {
    accessorKey: "roturasContenedor",
    header: "Roturas internas",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("roturasContenedor")}</div>
    ),
  },

  {
    accessorKey: "obs",
    header: "Observaciones",
    cell: ({ row }) => <div className="text-center">{row.getValue("obs")}</div>,
  },

  {
    accessorKey: "precintos",
    header: "Precintos",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("precintos")}</div>
    ),
  },

  {
    accessorKey: "cortinAire",
    header: "Cortina de aire",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cortinAire")}</div>
    ),
  },

  {
    accessorKey: "termoRegistro",
    header: "Termo registro",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("termoRegistro")}</div>
    ),
  },

  {
    accessorKey: "trazabilidadComp",
    header: "Trazabilidad completa",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("trazabilidadComp")}</div>
    ),
  },

  {
    accessorKey: "palletsComp",
    header: "Pallets completos",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("palletsComp")}</div>
    ),
  },

  {
    accessorKey: "documentacionComp",
    header: "Documentación completa",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("documentacionComp")}</div>
    ),
  },

  {
    accessorKey: "hInicial",
    header: "Hora inicial",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("hInicial")}</div>
    ),
  },

  {
    accessorKey: "hFinal",
    header: "Hora final",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("hFinal")}</div>
    ),
  },

  {
    accessorKey: "precintOPlanta",
    header: "Precinto Planta",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("precintOPlanta")}</div>
    ),
  },

  {
    accessorKey: "precintoAduana",
    header: "Precinto Aduana",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("precintoAduana")}</div>
    ),
  },

  {
    accessorKey: "precintoLinea",
    header: "Precinto Línea",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("precintoLinea")}</div>
    ),
  },

  {
    header: "Columna Izquierda",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // Filtra las claves que comienzan con "izq"
          const keysIzquierda = Object.keys(row.original.pallets || {}).filter(
            (key) => key.startsWith("izq")
          );
          // Mapea las claves filtradas para obtener los objetos de pallets correspondientes
          const palletsIzquierda = keysIzquierda.map(
            (key) => row.original.pallets[key]
          );
          // Llama a la función con el array filtrado y el título
          handleVerPallets(palletsIzquierda, "Columna Izquierda");
        }}
        className={"justify-center text-center"}
      >
        Ver más…
      </Button>
    ),
  },
  {
    header: "Columna Derecha",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // Filtra las claves que comienzan con "der"
          const keysDerecha = Object.keys(row.original.pallets || {}).filter(
            (key) => key.startsWith("der")
          );
          // Mapea las claves filtradas para obtener los objetos de pallets correspondientes
          const palletsDerecha = keysDerecha.map(
            (key) => row.original.pallets[key]
          );
          // Llama a la función con el array filtrado y el título
          handleVerPallets(palletsDerecha, "Columna Derecha");
        }}
      >
        Ver más…
      </Button>
    ),
  },
];
