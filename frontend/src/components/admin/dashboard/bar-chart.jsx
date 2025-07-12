import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ selectedProduct }) => {
  const allData = [
    { name: "Lácteos", value: 450, color: "#16a34a" },
    { name: "Bebidas", value: 320, color: "#22c55e" },
    { name: "Conservas", value: 280, color: "#4ade80" },
    { name: "Cereales", value: 197, color: "#86efac" },
    { name: "Otros", value: 150, color: "#bbf7d0" },
  ];

  const filteredData =
    selectedProduct === "all"
      ? allData
      : allData.filter((item) =>
          item.name.toLowerCase().includes(selectedProduct)
        );

  const data = filteredData.length > 0 ? filteredData : allData;

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Producción por Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
