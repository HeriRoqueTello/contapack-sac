import { Package, Leaf, Award, Globe } from "lucide-react";

export function ProductsHero() {
  const stats = [
    { icon: Package, number: "4", label: "Líneas de Productos" },
    { icon: Leaf, number: "100%", label: "Productos Naturales" },
    { icon: Award, number: "5+", label: "Certificaciones" },
    { icon: Globe, number: "50+", label: "Países de Destino" },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4 mr-2" />
            Productos Premium
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Nuestro <span className="text-primary-600">Catálogo</span> de
            Productos
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Descubre nuestra amplia gama de productos agrícolas premium,
            cultivados con los más altos estándares de calidad y procesados con
            tecnología de vanguardia para mercados internacionales.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-primary-200 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
