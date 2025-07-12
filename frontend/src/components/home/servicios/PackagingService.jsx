import { Box, Leaf, Shield, Recycle } from "lucide-react";

export function PackagingService() {
  const packagingTypes = [
    {
      icon: Box,
      title: "Empaque Tradicional",
      description: "Cajas de cartón corrugado para diferentes productos",
      options: [
        "Cajas de 4kg",
        "Cajas de 10kg",
        "Cajas de 15kg",
        "Empaque personalizado",
      ],
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Shield,
      title: "Empaque Protectivo",
      description: "Soluciones especiales para productos delicados",
      options: [
        "Empaque al vacío",
        "Atmósfera modificada",
        "Bandejas especiales",
        "Film protector",
      ],
      color: "from-primary-600 to-primary-700",
    },
    {
      icon: Leaf,
      title: "Empaque Sostenible",
      description: "Soluciones ecológicas y biodegradables",
      options: [
        "Materiales reciclables",
        "Tintas ecológicas",
        "Reducción de plástico",
        "Certificación FSC",
      ],
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Recycle,
      title: "Empaque Reutilizable",
      description: "Contenedores reutilizables para clientes frecuentes",
      options: [
        "Contenedores plásticos",
        "Cajas retornables",
        "Pallets reutilizables",
        "Sistema de devolución",
      ],
      color: "from-primary-600 to-primary-700",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Soluciones de <span className="text-primary-600">Empaque</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Soluciones de empaque innovadoras y sostenibles que preservan la
            frescura y calidad de nuestros productos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {packagingTypes.map((type, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center mb-4`}
              >
                <type.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{type.description}</p>
              <ul className="space-y-2">
                {type.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Packaging Benefits */}
        <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Beneficios de Nuestro Empaque
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Conservación",
                description: "Mantiene la frescura y calidad del producto",
                percentage: "95%",
                metric: "Retención de frescura",
              },
              {
                title: "Sostenibilidad",
                description: "Materiales eco-amigables y reciclables",
                percentage: "80%",
                metric: "Materiales reciclables",
              },
              {
                title: "Protección",
                description: "Resistencia durante transporte y almacenamiento",
                percentage: "99%",
                metric: "Productos sin daños",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {benefit.percentage}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {benefit.description}
                </div>
                <div className="text-xs text-primary-600 font-medium">
                  {benefit.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
