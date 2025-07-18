import { Target, Eye, Heart, Leaf } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ValueCard } from "../ui/ValueCard";

export function Nosotros() {
  const values = [
    {
      icon: Heart,
      title: "Orientación al cliente",
      description:
        "Estamos orientados a desarrollar relaciones a largo plazo con nuestros clientes, ofreciéndoles productos y servicios de calidad",
    },
    {
      icon: Target,
      title: "Calidad",
      description:
        "Estamos orientados a cumplir con los estándares internacionales de calidad. Esto garantiza la satisfacción del cliente y la fidelidad a la marca.",
    },
    {
      icon: Eye,
      title: "Confianza",
      description:
        "En todo nuestro equipo humano (productores, trabajadores, clientes, aliados, etc)",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description:
        "Las prácticas agrícolas sostenibles generan una imagen positiva de la empresa ante los consumidores conscientes del medio ambiente.",
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto">
        <SectionHeader
          title="Historia"
          subtitle="Conoce nuestra historia, misión y valores que nos impulsan cada día"
        />

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Visión */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Eye className="w-6 h-6 text-primary-600 mr-3" />
              VISIÓN
            </h3>
            <p className="text-gray-600 leading-relaxed text-pretty">
              Ser reconocidos a nivel mundial como principal aliado estratégico
              por la calidad de nuestros productos. Estableciendo relaciones
              sólidas, innovadoras y sostenibles con nuestros clientes y socios
              comerciales, buscando constantemente la satisfacción y mejora
              continua en nuestros procesos.
            </p>
          </div>

          {/* Misión */}
          <div
            className="space-y-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 text-primary-600 mr-3" />
              MISIÓN
            </h3>
            <p className="text-gray-600 leading-relaxed text-pretty">
              Nuestra misión es producir y comercializar productos de la más
              alta calidad que satisfagan las necesidades y superen las
              expectativas de los clientes nacionales e internacionales,
              ofreciendo productos frescos y saludables, proporcionando
              oportunidades de crecimiento y desarrollo en las comunidades donde
              operamos.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="space-y-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 text-balance">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ValueCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
