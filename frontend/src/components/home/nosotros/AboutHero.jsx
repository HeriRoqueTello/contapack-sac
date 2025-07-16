import { Target, Eye, Users, Award } from "lucide-react";

export function AboutHero() {
  const stats = [
    { icon: Users, number: "500+", label: "Empleados" },
    { icon: Award, number: "3+", label: "Años de Experiencia" },
    { icon: Target, number: "50+", label: "Países de Exportación" },
    { icon: Eye, number: "100%", label: "Calidad Garantizada" },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Conoce más sobre{" "}
                <span className="text-primary-600">ContaPack SAC</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Somos una empresa peruana líder en el procesamiento y empaque de
                productos agrícolas, comprometida con la excelencia y la
                sostenibilidad desde hace más de dos décadas.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white rounded-xl shadow-sm border border-primary-100"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/nosotros.jpg"
                alt="Instalaciones ContaPack"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">ISO 9001</div>
              <div className="text-sm opacity-90">Certificación de Calidad</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
