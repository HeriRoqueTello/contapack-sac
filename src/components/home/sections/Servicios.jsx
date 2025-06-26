import { Package, Shield, Truck, Box } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ServiceCard } from "../ui/ServiceCard";

export function Servicios() {
  const services = [
    {
      icon: Package,
      title: "Procesamiento",
      description:
        "Procesamiento especializado de productos agrícolas con tecnología de vanguardia y control de calidad riguroso.",
    },
    {
      icon: Shield,
      title: "Control de Calidad",
      description:
        "Sistemas de control de calidad certificados que garantizan la excelencia en cada producto que procesamos.",
    },
    {
      icon: Truck,
      title: "Distribución",
      description:
        "Red de distribución nacional e internacional que lleva nuestros productos a mercados globales.",
    },
    {
      icon: Box,
      title: "Empaques",
      description:
        "Soluciones de empaque innovadoras y sostenibles que preservan la frescura y calidad de nuestros productos.",
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <SectionHeader
          title="Servicios"
          subtitle="Ofrecemos soluciones integrales para el procesamiento y distribución de productos agrícolas"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
