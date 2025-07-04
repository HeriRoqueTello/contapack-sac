import React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "./button"
import { Checkbox } from "./checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Input } from "./input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

// ✅ Datos simples sin tipado
const data = [
  {
    id: "01",
    estado: "Procesado",
    exportador: "Heri Roque",
    codLote: "0101",
    categoria: "Palta",
    calibre: "10",
    pesoUni: "10 kg",
    codEmp: "1111",
    clp: "1234567890",
    fechaEmp: "03/07/25",
    trazabilidad: "5121321321321",
  },
  {
    id: "02",
    estado: "Procesado",
    exportador: "Anthony Diaz",
    codLote: "0201",
    categoria: "Palta",
    calibre: "15",
    pesoUni: "15 kg",
    codEmp: "2222",
    clp: "1234567890",
    fechaEmp: "03/07/25",
    trazabilidad: "5121321321321",
  },
  {
    id: "03",
    estado: "No Procesado",
    exportador: "Juan Condor",
    codLote: "0301",
    categoria: "Palta",
    calibre: "20",
    pesoUni: "10 kg",
    codEmp: "3333",
    clp: "1234567890",
    fechaEmp: "03/07/25",
    trazabilidad: "5121321321321",
  },
  {
    id: "04",
    estado: "Procesado",
    exportador: "Nick Ruiz",
    codLote: "0401",
    categoria: "Palta",
    calibre: "10",
    pesoUni: "20 kg",
    codEmp: "4444",
    clp: "1234567890",
    fechaEmp: "03/07/25",
    trazabilidad: "5121321321321",
  },
  {
    id: "05",
    estado: " No Procesado",
    exportador: "Jhon Vasquez",
    codLote: "0502",
    categoria: "Palta",
    calibre: "20",
    pesoUni: "10 kg",
    codEmp: "5555",
    clp: "1234567890",
    fechaEmp: "03/07/25",
    trazabilidad: "5121321321321",
  },
]

// ✅ Columnas sin tipos
const columns = [
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
      <div className="capitalize">{row.getValue("estado")}</div>
    ),
  },

  {
    accessorKey: "exportador",
    header: "Exportador",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("exportador")}</div>
    ),
  },

  {
    accessorKey: "codLote",
    header: "Lote",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("codLote")}</div>
    ),
  },
  

  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoria")}</div>
    ),
  },
  {
    accessorKey: "calibre",
    header: "Calibre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("calibre")}</div>
    ),
  },

  {
    accessorKey: "pesoUni",
    header: "Peso por unidad",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("pesoUni")}</div>
    ),
  },

  {
    accessorKey: "codEmp",
    header: "Codigo de Empaque",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("codEmp")}</div>
    ),
  },

  {
    accessorKey: "clp",
    header: "CLP",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clp")}</div>
    ),
  },

  {
    accessorKey: "fechaEmp",
    header: "Fecha",  
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fechaEmp")}</div>
    ),
  },

  {
    accessorKey: "trazabilidad",
    header: "Trazabilidad",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("trazabilidad")}</div>
    ),
  },
  
  
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// ✅ Componente principal
export function TableEtiqueta() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por ID."
          value={table.getColumn("id")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}