import { Truck, Globe, Clock, MapPin } from "lucide-react";

export function DistributionService() {
  const distributionFeatures = [
    {
      icon: Truck,
      title: "Flota Especializada",
      description: "Vehículos refrigerados para mantener la cadena de frío",
      details: [
        "Contenedores refrigerados",
        "Control de temperatura",
        "Monitoreo GPS",
        "Mantenimiento preventivo",
      ],
    },
    {
      icon: Globe,
      title: "Red Internacional",
      description: "Presencia en más de 50 países a nivel mundial",
      details: [
        "Agentes en destino",
        "Documentación completa",
        "Seguros de carga",
        "Gestión aduanera",
      ],
    },
    {
      icon: Clock,
      title: "Entregas Puntuales",
      description: "Cumplimiento de tiempos de entrega garantizado",
      details: [
        "Planificación logística",
        "Tracking en tiempo real",
        "Alertas automáticas",
        "Reportes de entrega",
      ],
    },
    {
      icon: MapPin,
      title: "Cobertura Nacional",
      description: "Distribución a nivel nacional con centros estratégicos",
      details: [
        "Centros de distribución",
        "Rutas optimizadas",
        "Entrega last-mile",
        "Almacenes regionales",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Servicio de <span className="text-primary-600">Distribución</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Red de distribución nacional e internacional que lleva nuestros
            productos a mercados globales con la máxima eficiencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {distributionFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-primary-200 rounded-2xl p-6 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Distribution Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">
            Alcance de Distribución
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Países de destino</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-primary-200">Entregas a tiempo</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Monitoreo de carga</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15 días</div>
              <div className="text-primary-200">
                Tiempo promedio de tránsito
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
