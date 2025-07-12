import { Factory, Thermometer, Truck, Package } from "lucide-react";

export function FacilitiesSection() {
  const facilities = [
    {
      icon: Factory,
      title: "Planta de Procesamiento",
      description:
        "15,000 m² de instalaciones modernas con tecnología de punta",
      specs: [
        "Capacidad: 50 TM/día",
        "Líneas automatizadas",
        "Control de calidad integrado",
      ],
    },
    {
      icon: Thermometer,
      title: "Cámaras Frigoríficas",
      description:
        "Sistema de refrigeración controlada para mantener la cadena de frío",
      specs: [
        "Capacidad: 2,000 TM",
        "Temperatura: -1°C a 15°C",
        "Humedad controlada",
      ],
    },
    {
      icon: Package,
      title: "Centro de Empaque",
      description:
        "Área especializada para el empaque y etiquetado de productos",
      specs: [
        "10 líneas de empaque",
        "Trazabilidad completa",
        "Empaque personalizado",
      ],
    },
    {
      icon: Truck,
      title: "Centro de Distribución",
      description:
        "Logística integrada para envíos nacionales e internacionales",
      specs: [
        "Flota propia",
        "Contenedores refrigerados",
        "Tracking en tiempo real",
      ],
    },
  ];

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Instalaciones
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contamos con instalaciones de última generación que nos permiten
            garantizar la más alta calidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <facility.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>
                  <ul className="space-y-2">
                    {facility.specs.map((spec, specIndex) => (
                      <li
                        key={specIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
