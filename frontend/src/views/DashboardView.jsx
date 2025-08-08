import { getRotulos } from "@/api/rotuloApi";
import BarChart from "@/components/admin/dashboard/bar-chart";
import { DataTable } from "@/components/admin/dashboard/data-table";
import DatePicker from "@/components/admin/dashboard/date-picker";
import { LineChart } from "@/components/admin/dashboard/line-chart";
import SearchInput from "@/components/admin/dashboard/search-input";
import { SectionCards } from "@/components/admin/dashboard/section-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export function DashboardView() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    data: dataRotulo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rotulos"],
    queryFn: getRotulos,
  });

  const barChartData = useMemo(() => {
    if (!dataRotulo) {
      return [];
    }

    const categorizeProduct = (productName) => {
      const lowerCaseName = productName?.toLowerCase();
      if (lowerCaseName?.includes("uva") || lowerCaseName?.includes("fruta")) {
        return "Frutas";
      }
      if (
        lowerCaseName?.includes("tomate") ||
        lowerCaseName?.includes("verdura")
      ) {
        return "Verduras";
      }
      return "Otros";
    };

    const aggregatedData = dataRotulo.reduce((acc, rotulo) => {
      const category = categorizeProduct(rotulo.Producto?.nombre);
      if (acc[category]) {
        acc[category] += rotulo.bandJabas;
      } else {
        acc[category] = rotulo.bandJabas;
      }
      return acc;
    }, {});

    return Object.keys(aggregatedData).map((key) => ({
      name: key,
      value: aggregatedData[key],
      color:
        key === "Verduras"
          ? "#16a34a"
          : key === "Frutas"
          ? "#22c55e"
          : "#bbf7d0",
    }));
  }, [dataRotulo]);

  const lineChartData = useMemo(() => {
    if (!dataRotulo) {
      return [];
    }

    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const monthlyEmbarques = {};

    dataRotulo.forEach((rotulo) => {
      // Usamos 'createdAt' para la fecha
      const date = new Date(rotulo.createdAt);
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];

      // Contamos solo si el estado es "Confirmado"
      if (rotulo.estado === "Confirmado") {
        monthlyEmbarques[monthName] = (monthlyEmbarques[monthName] || 0) + 1;
      }
    });

    // Formatear los datos para el gráfico
    return Object.keys(monthlyEmbarques).map((month) => ({
      month: month,
      embarques: monthlyEmbarques[month],
    }));
  }, [dataRotulo]);

  return (
    <div className="flex overflow-y-auto flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="px-4 lg:px-6">
          <h2 className="text-2xl font-bold text-gray-800">Resumen General</h2>
          <p className="text-gray-600">Vista general de las operaciones</p>
        </div>
      </div>
      <SectionCards
        dataRotulo={dataRotulo}
        isError={isError}
        isLoading={isLoading}
      />
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 px-4 lg:px-6">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar lotes, productos..."
          />
        </div>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Tipo de Producto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Productos</SelectItem>
            <SelectItem value="verduras">Verduras</SelectItem>
            <SelectItem value="frutas">Frutas</SelectItem>
            <SelectItem value="otros">Otros</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
      </div>
      <div className="px-4 lg:px-6">
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart data={barChartData} selectedProduct={selectedProduct} />
          <LineChart data={lineChartData} selectedProduct={selectedProduct} />
        </div>
        <DataTable
          dataRotulo={dataRotulo}
          isError={isError}
          isLoading={isLoading}
          searchTerm={searchTerm}
          selectedProduct={selectedProduct}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
