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

export const DataTable = ({
  dataRotulo,
  isLoading,
  isError,
  searchTerm,
  selectedProduct,
  selectedDate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("fecha");
  const [sortDirection, setSortDirection] = useState("desc");
  const itemsPerPage = 5;

  // 2. Mapear, filtrar, ordenar y paginar los datos
  const mappedAndFilteredData = useMemo(() => {
    if (!dataRotulo) return [];

    // Mapear los datos de rotulo a un formato más simple para la tabla
    const mapped = dataRotulo.map((item) => ({
      codigo: `RE-${item.numIngreso.toString().padStart(3, "0")}`, // Generar un código con el ID
      id: item.id,
      fecha: new Date(item.createdAt).toLocaleDateString(), // Formatear la fecha
      createdAt: item.createdAt, // Campo para ordenar
      producto: item.Producto?.nombre,
      lugar: item.Productor?.nombre, // Usar el nombre del productor como lugar
      cantidad: `${item.kgIngresados} Kg`,
      kgIngresados: item.kgIngresados, // Campo para ordenar
      estado: item.estado,
    }));

    let filtered = mapped;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lugar.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo de producto (usando la lógica del BarChart)
    const categorizeProduct = (productName) => {
      const lowerCaseName = productName?.toLowerCase();
      if (lowerCaseName?.includes("uva") || lowerCaseName?.includes("fruta")) {
        return "frutas";
      }
      if (
        lowerCaseName?.includes("tomate") ||
        lowerCaseName?.includes("verdura")
      ) {
        return "verduras";
      }
      return "otros";
    };

    if (selectedProduct && selectedProduct !== "all") {
      filtered = filtered.filter(
        (item) =>
          categorizeProduct(item.producto) === selectedProduct.toLowerCase()
      );
    }

    // Filtrar por fecha seleccionada
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt).toISOString().split("T")[0] ===
          selectedDateString
      );
    }

    // Ordenar los datos
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    dataRotulo,
    searchTerm,
    selectedProduct,
    selectedDate,
    sortField,
    sortDirection,
  ]);

  // Paginación
  const totalPages = Math.ceil(mappedAndFilteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = mappedAndFilteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    setCurrentPage(1); // Resetear la página al cambiar el orden
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

  if (isError) {
    return <div>Error al cargar los datos.</div>;
  }

  if (paginatedData.length === 0) {
    return (
      <EmptyState message="No se encontraron lotes con los filtros aplicados" />
    );
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
                            item.estado === "Confirmado"
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
                    mappedAndFilteredData.length
                  )}{" "}
                  de {mappedAndFilteredData.length} resultados
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
