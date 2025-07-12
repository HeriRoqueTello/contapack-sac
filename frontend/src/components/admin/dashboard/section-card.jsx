import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import MetricCard from "./metric-card";

const metrics = [
  {
    title: "Total de Lotes Producidos",
    value: "1,247",
    change: "+12%",
    positive: true,
  },
  {
    title: "Unidades Empacadas",
    value: "45,892",
    change: "+8%",
    positive: true,
  },
  {
    title: "Embarques Aprobados",
    value: "234",
    change: "+15%",
    positive: true,
  },
  {
    title: "Materia Prima Ingresada",
    value: "12.5T",
    change: "-3%",
    positive: false,
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 lg:px-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
