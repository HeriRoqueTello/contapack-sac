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
import { useAuthStore } from "@/store/user-store";

export const columnsRotulo = (
  onConfirmar,
  onEliminar,
  setRegistroEditando,
  setDialogOpen,
  onGenerarReporte
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
      const rotulo = row.original;
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
            <DropdownMenuItem
              onClick={() => {
                onGenerarReporte(rotulo);
              }}
            >
              Generar Reporte
            </DropdownMenuItem>
            {isEncargado && (
              <DropdownMenuItem onClick={() => onConfirmar(rotulo.id)}>
                {rotulo.estado === "Confirmado" ? "No confirmar" : "Confirmar"}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                setRegistroEditando(rotulo);
                setDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
            {isEncargado && (
              <DropdownMenuItem onClick={() => onEliminar(rotulo.id)}>
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
    // --- CAMBIO 1 ---
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const fecha = row.original.RegistroMateriaPrima?.fecha;
      return (
        <div className="text-center">
          {fecha ? new Date(fecha).toLocaleDateString() : "Sin fecha"}
        </div>
      );
    },
  },
  {
    // --- CAMBIO 2 ---
    header: "Productor/Proveedor",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.RegistroMateriaPrima?.Productor?.nombre ||
          "Sin productor"}
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
    header: "Producto",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.nombre || "Sin producto"}
      </div>
    ),
  },
  {
    header: "Variedad",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.Producto?.Variedad?.nombre || "Sin variedad"}
      </div>
    ),
  },
  {
    // --- CAMBIO 3 ---
    header: "N° Ingreso",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.RegistroMateriaPrima?.numIngreso || "N/A"}
      </div>
    ),
  },
  {
    // --- CAMBIO 4 ---
    header: "Exportador",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.RegistroMateriaPrima?.Exportador?.nombreEmpresa ||
          "Sin exportador"}
      </div>
    ),
  },
  {
    // --- CAMBIO 5 ---
    header: "Responsable",
    cell: ({ row }) => {
      const responsables =
        row.original.RegistroMateriaPrima?.Productor?.responsables || [];
      return (
        <div className="text-center">
          {responsables.length > 0 ? responsables[0].nombre : "No asignado"}
        </div>
      );
    },
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
  cell: ({ row }) => {
    const fecha = row.getValue("fechaProceso");
    if (!fecha) return "N/A";

    // fecha tiene formato YYYY-MM-DD
    const [yyyy, mm, dd] = fecha.split("-");
    

    return (
      <div className="text-center">
        {`${dd}/${mm}/${yyyy}`} {/* Formato DD/MM/AA */}
      </div>
    );
  },
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
    header: "Lote Asociado",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("registroMateriaPrimaId")}
      </div>
    ),
  },
];
