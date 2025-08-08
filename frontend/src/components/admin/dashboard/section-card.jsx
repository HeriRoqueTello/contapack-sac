import { useMemo } from "react";
import MetricCard from "./metric-card";

export function SectionCards({ dataRotulo, isLoading, isError }) {
  const metricsData = useMemo(() => {
    if (!dataRotulo) {
      return {
        totalLotes: { value: 0, change: 0 },
        unidadesEmpacadas: { value: 0, change: 0 },
        embarquesAprobados: { value: 0, change: 0 },
        materiaPrimaIngresada: { value: "0T", change: 0 },
      };
    }

    const today = new Date();

    // Calcula la fecha de inicio de la semana actual (lunes)
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay() + 1); // El domingo es 0, el lunes es 1.
    startOfCurrentWeek.setHours(0, 0, 0, 0);

    // Calcula la fecha de inicio de la semana anterior
    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

    // Filtra los datos por semana
    const rotulosCurrentWeek = dataRotulo.filter(
      (r) => new Date(r.createdAt) >= startOfCurrentWeek
    );
    const rotulosPreviousWeek = dataRotulo.filter(
      (r) =>
        new Date(r.createdAt) >= startOfPreviousWeek &&
        new Date(r.createdAt) < startOfCurrentWeek
    );

    // Función auxiliar para calcular un valor de métrica
    const calculateValue = (rotulos, metricType) => {
      if (metricType === "lotes") return rotulos.length;
      if (metricType === "unidades")
        return rotulos.reduce((sum, r) => sum + r.bandJabas, 0);
      if (metricType === "aprobados")
        return rotulos.filter((r) => r.estado === "Confirmado").length;
      if (metricType === "materiaPrimaKg")
        return rotulos.reduce(
          (sum, r) => (r.materiaPrima ? sum + r.kgIngresados : sum),
          0
        );
      return 0;
    };

    // Obtener los valores de ambos períodos
    const current = {
      lotes: calculateValue(rotulosCurrentWeek, "lotes"),
      unidades: calculateValue(rotulosCurrentWeek, "unidades"),
      aprobados: calculateValue(rotulosCurrentWeek, "aprobados"),
      materiaPrimaKg: calculateValue(rotulosCurrentWeek, "materiaPrimaKg"),
    };
    const previous = {
      lotes: calculateValue(rotulosPreviousWeek, "lotes"),
      unidades: calculateValue(rotulosPreviousWeek, "unidades"),
      aprobados: calculateValue(rotulosPreviousWeek, "aprobados"),
      materiaPrimaKg: calculateValue(rotulosPreviousWeek, "materiaPrimaKg"),
    };

    // Función para calcular el cambio porcentual de forma segura
    const calculateChange = (currentVal, previousVal) => {
      if (previousVal === 0) {
        return currentVal > 0 ? 100 : 0;
      }
      return ((currentVal - previousVal) / previousVal) * 100;
    };

    return {
      totalLotes: {
        value: current.lotes.toLocaleString(),
        change: calculateChange(current.lotes, previous.lotes),
      },
      unidadesEmpacadas: {
        value: current.unidades.toLocaleString(),
        change: calculateChange(current.unidades, previous.unidades),
      },
      embarquesAprobados: {
        value: current.aprobados.toLocaleString(),
        change: calculateChange(current.aprobados, previous.aprobados),
      },
      materiaPrimaIngresada: {
        value: `${(current.materiaPrimaKg / 1000).toFixed(1)}T`,
        change: calculateChange(
          current.materiaPrimaKg,
          previous.materiaPrimaKg
        ),
      },
    };
  }, [dataRotulo]);

  if (isLoading) {
    return <div>Cargando métricas...</div>;
  }

  if (isError) {
    return <div>Error al cargar las métricas.</div>;
  }

  const metrics = [
    {
      title: "Total de Lotes Producidos",
      value: metricsData.totalLotes.value,
      change: `${
        metricsData.totalLotes.change >= 0 ? "+" : ""
      }${metricsData.totalLotes.change.toFixed(1)}%`,
      positive: metricsData.totalLotes.change >= 0,
    },
    {
      title: "Unidades Empacadas",
      value: metricsData.unidadesEmpacadas.value,
      change: `${
        metricsData.unidadesEmpacadas.change >= 0 ? "+" : ""
      }${metricsData.unidadesEmpacadas.change.toFixed(1)}%`,
      positive: metricsData.unidadesEmpacadas.change >= 0,
    },
    {
      title: "Embarques Aprobados",
      value: metricsData.embarquesAprobados.value,
      change: `${
        metricsData.embarquesAprobados.change >= 0 ? "+" : ""
      }${metricsData.embarquesAprobados.change.toFixed(1)}%`,
      positive: metricsData.embarquesAprobados.change >= 0,
    },
    {
      title: "Materia Prima Ingresada",
      value: metricsData.materiaPrimaIngresada.value,
      change: `${
        metricsData.materiaPrimaIngresada.change >= 0 ? "+" : ""
      }${metricsData.materiaPrimaIngresada.change.toFixed(1)}%`,
      positive: metricsData.materiaPrimaIngresada.change >= 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-4 lg:px-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
