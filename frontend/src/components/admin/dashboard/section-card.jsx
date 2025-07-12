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

const metricsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    window.innerWidth >= 1024
      ? "repeat(4, 1fr)"
      : window.innerWidth >= 640
      ? "repeat(2, 1fr)"
      : "1fr",
  gap: "16px",
  marginBottom: "32px",
};

export function SectionCards() {
  return (
    <div style={metricsGridStyle}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
