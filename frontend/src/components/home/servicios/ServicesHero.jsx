import { Package, Shield, Truck, Box } from "lucide-react";

export function ServicesHero() {
  const services = [
    { icon: Package, name: "Procesamiento", count: "4" },
    { icon: Shield, name: "Control de Calidad", count: "24/7" },
    { icon: Truck, name: "Distribución", count: "50+" },
    { icon: Box, name: "Empaques", count: "100%" },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4 mr-2" />
            Servicios Especializados
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Soluciones <span className="text-primary-600">Integrales</span> para
            la Agroindustria
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Ofrecemos servicios completos desde el procesamiento hasta la
            distribución, garantizando la máxima calidad en cada etapa del
            proceso agroindustrial.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-primary-200 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.name}
              </h3>
              <div className="text-2xl font-bold text-primary-600">
                {service.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
