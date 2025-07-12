import { MapPin, Navigation, Phone } from "lucide-react";

export function ContactMap() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visítanos en nuestras{" "}
            <span className="text-primary-200">instalaciones</span>
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Te invitamos a conocer nuestras modernas instalaciones y procesos de
            calidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="aspect-[4/3] bg-primary-200 rounded-xl flex items-center justify-center">
              <div className="text-center text-primary-800">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Mapa Interactivo</p>
                <p className="text-sm">Ubicación de nuestras instalaciones</p>
              </div>
            </div>
          </div>

          {/* Visit Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Programa tu visita
              </h3>
              <p className="text-primary-100 mb-6">
                Conoce de primera mano nuestros procesos de calidad,
                instalaciones modernas y el compromiso que tenemos con la
                excelencia.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Tour por las instalaciones",
                  description: "Recorrido completo por planta de procesamiento",
                },
                {
                  icon: Navigation,
                  title: "Demostración de procesos",
                  description:
                    "Observa nuestros estándares de calidad en acción",
                },
                {
                  icon: Phone,
                  title: "Reunión con especialistas",
                  description: "Consulta directa con nuestro equipo técnico",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/10 rounded-lg border border-white/20"
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-primary-200 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Agendar Visita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
