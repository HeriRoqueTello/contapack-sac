import { DistributionService } from "@/components/home/servicios/DistributionService";
import { PackagingService } from "@/components/home/servicios/PackagingService";
import { ProcessingService } from "@/components/home/servicios/ProcessingService";
import { QualityService } from "@/components/home/servicios/QualityService";
import { ServicesCTA } from "@/components/home/servicios/ServicesCTA";
import { ServicesHero } from "@/components/home/servicios/ServicesHero";
import { ServicesOverview } from "@/components/home/servicios/ServicesOverview";

export function ServiciosView() {
  return (
    <div className="min-h-screen bg-white">
      <ServicesHero />
      <ServicesOverview />
      <ProcessingService />
      <QualityService />
      <DistributionService />
      <PackagingService />
      <ServicesCTA />
    </div>
  );
}
