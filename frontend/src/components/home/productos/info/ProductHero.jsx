import { Star, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function ProductHero({ product }) {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-primary-600">
            Productos
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    Calidad Premium
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-primary-100">
                <Calendar className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="text-sm text-gray-600">Temporada</div>
                  <div className="font-semibold text-gray-900">
                    {product.specs.temporada}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-primary-100">
                <MapPin className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="text-sm text-gray-600">Origen</div>
                  <div className="font-semibold text-gray-900">Perú</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <Link
                to={`/contacto`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded"
              >
                Solicitar Cotización
              </Link>
              <Button
                variant="outline"
                disabled
                className="border-primary-600 text-primary-600 hover:bg-primary-50 bg-transparent"
              >
                Descargar Ficha Técnica
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-lg font-bold">100%</div>
              <div className="text-sm opacity-90">Natural</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
