import { TableEtiqueta } from "@/components/admin/etiqueta/taetiqueta";
import { ChartAreaInteractive } from "@/components/admin/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/admin/dashboard/section-card";
import { AdminLayout } from "@/layout/AdminLayout";
import { ProductCard } from "@/components/home/ui/ProductCard";
import { DialogDemo } from "@/components/admin/etiqueta/dialogDemo";

export function TaEtiquetaView() {
  return (
    <>
      <div className="text-end">
        <DialogDemo />
      </div>
      <TableEtiqueta />
    </>
  );
}
