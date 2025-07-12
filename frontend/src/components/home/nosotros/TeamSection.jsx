import { Users, Award, Target, Heart } from "lucide-react";

export function TeamSection() {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description:
        "Dedicación total con nuestros clientes, empleados y comunidad",
    },
    {
      icon: Award,
      title: "Excelencia",
      description:
        "Búsqueda constante de la más alta calidad en todos nuestros procesos",
    },
    {
      icon: Target,
      title: "Innovación",
      description:
        "Implementación de tecnologías avanzadas y mejores prácticas",
    },
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Colaboración y sinergia para alcanzar objetivos comunes",
    },
  ];

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contamos con un equipo de profesionales altamente capacitados y
            comprometidos con la excelencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Empleados Directos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                1,200+
              </div>
              <div className="text-gray-600">Productores Asociados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                95%
              </div>
              <div className="text-gray-600">Satisfacción Laboral</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
