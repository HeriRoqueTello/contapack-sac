import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Star, Calendar, MapPin } from "lucide-react";

export function ProductsGrid() {
  const products = [
    {
      slug: "palta",
      name: "Palta Hass",
      category: "Frutas",
      description:
        "Palta premium seleccionada para mercados internacionales con alto contenido de grasas saludables.",
      image: "/placeholder.svg?height=400&width=600",
      season: "Mar - Sep",
      origin: "Valles de Lima",
      rating: 5,
      features: [
        "Rico en Omega-3",
        "Exportación Premium",
        "Trazabilidad Completa",
      ],
    },
    {
      slug: "brocoli",
      name: "Brócoli Premium",
      category: "Verduras",
      description:
        "Brócoli fresco procesado con tecnología de punta, rico en vitaminas y antioxidantes naturales.",
      image: "/placeholder.svg?height=400&width=600",
      season: "Todo el año",
      origin: "Valles de Arequipa",
      rating: 5,
      features: [
        "Alto en Vitamina C",
        "IQF Disponible",
        "Certificado Orgánico",
      ],
    },
    {
      slug: "esparragos",
      name: "Espárragos Verdes",
      category: "Verduras",
      description:
        "Espárragos premium cultivados bajo estrictos estándares, perfectos para mercados gourmet.",
      image: "/placeholder.svg?height=400&width=600",
      season: "Sep - Dic",
      origin: "Valles de Ica",
      rating: 5,
      features: ["Bajo en Calorías", "Rico en Folato", "Calidad Gourmet"],
    },
    {
      slug: "uvas",
      name: "Uvas Red Globe",
      category: "Frutas",
      description:
        "Uvas frescas de mesa con excelente sabor y presentación, ideales para exportación.",
      image: "/uvas-principal.jpg",
      season: "Dic - Abr",
      origin: "Valles de Piura",
      rating: 5,
      features: [
        "Alto Contenido de Brix",
        "Larga Vida Útil",
        "Presentación Premium",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros <span className="text-primary-600">Productos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cada producto es cuidadosamente seleccionado y procesado para
            garantizar la máxima calidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{product.season}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">{product.origin}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/productos/${product.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-primary">
                    Ver Información Completa
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
