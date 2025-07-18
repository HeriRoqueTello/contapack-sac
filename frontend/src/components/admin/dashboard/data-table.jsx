import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

export const DataTable = ({ searchTerm, selectedProduct, selectedDate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("fecha");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  // Mock data
  const allData = [
    {
      codigo: "RE-2025-021",
      fecha: "2025-07-18",
      producto: "Frutas",
      lugar: "Planta Norte",
      cantidad: "450 Kg",
      estado: "Completado",
    },
    {
      codigo: "RE-2025-022",
      fecha: "2025-07-17",
      producto: "Verduras",
      lugar: "Planta Sur",
      cantidad: "800 Kg",
      estado: "En Proceso",
    },
    {
      codigo: "RE-2025-023",
      fecha: "2025-07-16",
      producto: "Otros",
      lugar: "Planta Este",
      cantidad: "1,200 Kg",
      estado: "Completado",
    },
    {
      codigo: "RE-2025-024",
      fecha: "2025-07-15",
      producto: "Frutas",
      lugar: "Planta Norte",
      cantidad: "620 Kg",
      estado: "En Proceso",
    },
    {
      codigo: "RE-2025-025",
      fecha: "2025-07-14",
      producto: "Verduras",
      lugar: "Planta Sur",
      cantidad: "980 Kg",
      estado: "Completado",
    },
    {
      codigo: "RE-2025-026",
      fecha: "2025-07-13",
      producto: "Otros",
      lugar: "Planta Este",
      cantidad: "1,500 Kg",
      estado: "Completado",
    },
    {
      codigo: "RE-2025-027",
      fecha: "2025-07-12",
      producto: "Frutas",
      lugar: "Planta Norte",
      cantidad: "550 Kg",
      estado: "En Proceso",
    },
    {
      codigo: "RE-2025-028",
      fecha: "2025-07-11",
      producto: "Verduras",
      lugar: "Planta Sur",
      cantidad: "1,100 Kg",
      estado: "Completado",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    setIsLoading(true);
    let filtered = allData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lugar.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by product type
    if (selectedProduct && selectedProduct !== "all") {
      filtered = filtered.filter((item) =>
        item.producto.toLowerCase().includes(selectedProduct.toLowerCase())
      );
    }

    // Filter by selected date
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
      filtered = filtered.filter((item) => item.fecha === selectedDateString);
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "fecha") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setIsLoading(false);
    return filtered;
  }, [searchTerm, selectedProduct, selectedDate, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Últimos Lotes Registrados
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paginatedData.length === 0 ? (
          <EmptyState message="No se encontraron lotes con los filtros aplicados" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("codigo")}
                        className="h-auto p-0 font-semibold text-gray-700 hover:text-green-600"
                      >
                        Código de Lote
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("fecha")}
                        className="h-auto p-0 font-semibold text-gray-700 hover:text-green-600"
                      >
                        Fecha de Producción
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Lugar de Producción</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-green-700">
                        {item.codigo}
                      </TableCell>
                      <TableCell>{item.fecha}</TableCell>
                      <TableCell>{item.producto}</TableCell>
                      <TableCell>{item.lugar}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.estado === "Completado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.estado}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredAndSortedData.length
                  )}{" "}
                  de {filteredAndSortedData.length} resultados
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
