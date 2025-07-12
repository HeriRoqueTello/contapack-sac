import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ServicesOverview() {
  const benefits = [
    "Tecnología de vanguardia en todos los procesos",
    "Certificaciones internacionales de calidad",
    "Trazabilidad completa desde origen hasta destino",
    "Equipo de especialistas con más de 3 años de experiencia",
    "Capacidad de procesamiento de 50 TM/día",
    "Red de distribución en más de 50 países",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir nuestros{" "}
                <span className="text-primary-600">servicios</span>?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Somos líderes en la industria agrícola peruana, ofreciendo
                servicios integrales que garantizan la máxima calidad y
                eficiencia en cada proceso.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              to={`/contacto`}
              className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-primary"
            >
              Conocer más detalles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Servicios ContaPack"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">3+</div>
              <div className="text-sm opacity-90">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
