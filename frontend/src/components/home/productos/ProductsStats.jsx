import { TrendingUp, Users, Globe, Award } from "lucide-react";

export function ProductsStats() {
  const stats = [
    {
      icon: TrendingUp,
      number: "25%",
      label: "Crecimiento Anual",
      description: "En volumen de exportación",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Users,
      number: "200+",
      label: "Clientes Satisfechos",
      description: "En todo el mundo",
      color: "from-primary-600 to-primary-700",
    },
    {
      icon: Globe,
      number: "50+",
      label: "Países de Destino",
      description: "Presencia internacional",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Award,
      number: "100%",
      label: "Calidad Garantizada",
      description: "Certificaciones internacionales",
      color: "from-primary-600 to-primary-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Números que nos <span className="text-primary-200">Respaldan</span>
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Nuestro compromiso con la excelencia se refleja en cada cifra
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-primary-100 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-primary-200">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
