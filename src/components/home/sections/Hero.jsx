import { Button } from "@/components/ui/button";
import { StatsCard } from "../ui/StatsCard";

export function Hero() {
  const stats = [
    { number: "20+", label: "Años de Experiencia" },
    { number: "500+", label: "Productos Procesados" },
    { number: "100%", label: "Calidad Garantizada" },
  ];

  return (
    <section
      id="inicio"
      className="gradient-primary-light py-20 animate-fade-in"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Excelencia en{" "}
                <span className="text-primary-600">Agroindustria</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed text-pretty">
                Líderes en procesamiento y empaque de productos agrícolas con
                más de 20 años de experiencia, garantizando calidad peruana en
                cada producto.
              </p>
            </div>

            <Button
              size="lg"
              className="gradient-primary text-white px-8 py-4 rounded-lg font-medium text-lg border-2 hover:shadow-primary-lg transition-all duration-200 hover:scale-105"
            >
              Conocer Más
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <StatsCard {...stat} />
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className="relative animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-primary-lg">
              <img
                src="/contapack.jpg"
                alt="Trabajador empacando productos agrícolas"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2 text-balance">
                  Calidad Peruana en cada Producto
                </h3>
                <p className="text-sm opacity-90 text-pretty">
                  Instalaciones modernas con tecnología de punta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
