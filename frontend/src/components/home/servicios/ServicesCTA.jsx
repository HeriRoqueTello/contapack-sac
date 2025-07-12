import { Phone, Mail, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ServicesCTA() {
  const ctaOptions = [
    {
      icon: Phone,
      title: "Llamada Directa",
      description: "Habla con nuestros especialistas",
      action: "Llamar Ahora",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Mail,
      title: "Solicitar Cotización",
      description: "Recibe una propuesta personalizada",
      action: "Solicitar Cotización",
      color: "from-primary-600 to-primary-700",
    },
    {
      icon: Calendar,
      title: "Agendar Reunión",
      description: "Programa una visita a nuestras instalaciones",
      action: "Agendar Visita",
      color: "from-primary-500 to-primary-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para trabajar con{" "}
            <span className="text-primary-200">nosotros</span>?
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Contáctanos hoy mismo y descubre cómo nuestros servicios pueden
            impulsar tu negocio agroindustrial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {option.title}
              </h3>
              <p className="text-primary-100 mb-4 text-sm">
                {option.description}
              </p>
              <Link
                to={`/contacto`}
                className="bg-white mt-4 text-primary-600 hover:bg-primary-50 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {option.action}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
