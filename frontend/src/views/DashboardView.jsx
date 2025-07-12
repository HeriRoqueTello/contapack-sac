import BarChart from "@/components/admin/dashboard/bar-chart";
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
import { useState } from "react";

export function DashboardView() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex overflow-y-auto flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="px-4 lg:px-6">
          <h2 className="text-2xl font-bold text-gray-800">Resumen General</h2>
          <p className="text-gray-600">Vista general de las operaciones</p>
        </div>
      </div>
      <SectionCards />
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
          <BarChart selectedProduct={selectedProduct} />
          <LineChart selectedProduct={selectedProduct} />
        </div>
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  );
}
