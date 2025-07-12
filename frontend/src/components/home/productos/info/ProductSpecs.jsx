import { Package, Ruler, Thermometer, Calendar } from "lucide-react";

export function ProductSpecs({ product }) {
  const specs = [
    {
      icon: Ruler,
      title: "Calibres Disponibles",
      value: product.specs.calibres.join(", "),
    },
    {
      icon: Calendar,
      title: "Temporada",
      value: product.specs.temporada,
    },
    {
      icon: Package,
      title: "Empaque",
      value: product.specs.empaque,
    },
    {
      icon: Thermometer,
      title: "Conservación",
      value: product.specs.conservacion,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Especificaciones Técnicas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detalles técnicos y características específicas de nuestro{" "}
            {product.name.toLowerCase()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <spec.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {spec.title}
              </h3>
              <p className="text-gray-600">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-secondary-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Origen y Cultivo
              </h3>
              <p className="text-gray-600 mb-4">{product.specs.origen}</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Cultivo bajo estrictos controles de calidad
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Trazabilidad completa desde el campo
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Prácticas agrícolas sostenibles
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Proceso de Selección
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-primary-600 text-xs font-bold">
                      1
                    </span>
                  </div>
                  <span>Inspección visual y selección manual</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-primary-600 text-xs font-bold">
                      2
                    </span>
                  </div>
                  <span>Control de calidad por lotes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-primary-600 text-xs font-bold">
                      3
                    </span>
                  </div>
                  <span>Empaque y etiquetado especializado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
