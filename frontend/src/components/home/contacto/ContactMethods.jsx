import { MessageSquare, Video, Calendar, FileText } from "lucide-react";

export function ContactMethods() {
  const methods = [
    {
      icon: MessageSquare,
      title: "Chat en Vivo",
      description: "Habla directamente con nuestro equipo de ventas",
      action: "Iniciar Chat",
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      icon: Video,
      title: "Videollamada",
      description: "Agenda una reunión virtual con nuestros especialistas",
      action: "Agendar Reunión",
      color: "from-primary-600 to-primary-700",
      bgColor: "bg-primary-100",
    },
    {
      icon: Calendar,
      title: "Visita Presencial",
      description: "Conoce nuestras instalaciones y procesos",
      action: "Programar Visita",
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      icon: FileText,
      title: "Solicitar Cotización",
      description: "Recibe una propuesta personalizada para tu empresa",
      action: "Solicitar Cotización",
      color: "from-primary-600 to-primary-700",
      bgColor: "bg-primary-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Múltiples formas de{" "}
            <span className="text-primary-600">contactarnos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Elige la opción que mejor se adapte a tus necesidades y preferencias
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methods.map((method, index) => (
            <div
              key={index}
              className={`${method.bgColor} border border-primary-200 rounded-2xl p-6 text-center hover:shadow-primary-lg transition-all duration-300 hover:scale-105`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
