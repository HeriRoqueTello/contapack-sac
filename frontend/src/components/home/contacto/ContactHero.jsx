import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactHero() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "+51 1 234-5678",
      description: "Lun - Vie: 8:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@contapack.com",
      description: "Respuesta en 24 horas",
    },
    {
      icon: MapPin,
      title: "Dirección",
      value: "Av. Industrial 123",
      description: "Lima, Perú",
    },
    {
      icon: Clock,
      title: "Horario",
      value: "Lun - Vie",
      description: "8:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="w-4 h-4 mr-2" />
            Contáctanos
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Estamos aquí para <span className="text-primary-600">ayudarte</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Ponte en contacto con nuestro equipo de expertos. Estamos listos
            para atender tus consultas sobre nuestros productos y servicios
            agroindustriales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-primary-200 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {info.title}
              </h3>
              <div className="text-primary-600 font-semibold mb-1">
                {info.value}
              </div>
              <div className="text-sm text-gray-600">{info.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
