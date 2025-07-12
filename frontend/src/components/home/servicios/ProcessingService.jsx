import { Package, Thermometer, Scale, Clock } from "lucide-react";

export function ProcessingService() {
  const processes = [
    {
      icon: Scale,
      title: "Selección y Clasificación",
      description:
        "Selección manual y automatizada por calibre, peso y calidad",
      features: [
        "Clasificación por tamaño",
        "Control de defectos",
        "Separación automática",
      ],
    },
    {
      icon: Thermometer,
      title: "Procesamiento Térmico",
      description: "Tratamientos térmicos controlados para conservación",
      features: [
        "Blanqueado controlado",
        "Enfriamiento rápido",
        "Congelado IQF",
      ],
    },
    {
      icon: Package,
      title: "Empaque Especializado",
      description: "Empaque en atmósfera modificada y al vacío",
      features: [
        "Empaque al vacío",
        "Atmósfera modificada",
        "Etiquetado automático",
      ],
    },
    {
      icon: Clock,
      title: "Almacenamiento",
      description: "Cámaras frigoríficas con control de temperatura y humedad",
      features: [
        "Control de temperatura",
        "Monitoreo 24/7",
        "Trazabilidad completa",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Servicio de <span className="text-primary-600">Procesamiento</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Procesamiento especializado con tecnología de vanguardia para
            garantizar la máxima calidad y conservación de productos agrícolas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <div
              key={index}
              className="bg-white border border-primary-200 rounded-2xl p-6 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <process.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {process.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {process.description}
              </p>
              <ul className="space-y-2">
                {process.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50 TM</div>
              <div className="text-primary-200">Capacidad diaria</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15,000 m²</div>
              <div className="text-primary-200">Área de procesamiento</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Operación continua</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-primary-200">Eficiencia de proceso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
