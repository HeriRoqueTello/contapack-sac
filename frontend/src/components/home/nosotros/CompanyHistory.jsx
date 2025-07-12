import { Calendar, MapPin, TrendingUp, Globe } from "lucide-react";

export function CompanyHistory() {
  const milestones = [
    {
      year: "2021",
      title: "Fundación de la empresa",
      description:
        "Inicio de operaciones con enfoque en productos agrícolas locales",
      icon: Calendar,
    },
    {
      year: "2021",
      title: "Primera exportación",
      description: "Comenzamos a exportar paltas a mercados internacionales",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Expansión de instalaciones",
      description: "Ampliación de planta procesadora y cámaras frigoríficas",
      icon: MapPin,
    },
    {
      year: "2022",
      title: "Certificaciones internacionales",
      description: "Obtención de certificaciones Global GAP, HACCP y BRC",
      icon: TrendingUp,
    },
    {
      year: "2023",
      title: "Diversificación de productos",
      description:
        "Incorporación de brócoli, espárragos y uvas a nuestro portafolio",
      icon: TrendingUp,
    },
    {
      year: "2024",
      title: "Líderes en el mercado",
      description:
        "Reconocidos como una de las principales empresas agroexportadoras del país",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Historia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dos décadas de crecimiento, innovación y compromiso con la
            excelencia en la agroindustria peruana
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:gap-12 gap-6`}
              >
                {/* Content */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0
                      ? "lg:text-right lg:pr-8"
                      : "lg:text-left lg:pl-8"
                  } text-center`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-primary-100">
                    <div className="text-primary-600 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="lg:w-1/2 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
