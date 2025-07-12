import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactOffices() {
  const offices = [
    {
      name: "Oficina Principal",
      address: "Av. Industrial 123, Lima, Perú",
      phone: "+51 1 234-5678",
      email: "lima@contapack.com",
      hours: "Lun - Vie: 8:00 AM - 6:00 PM",
      type: "Sede Principal",
      color: "from-primary-500 to-primary-600",
    },
    {
      name: "Centro de Distribución",
      address: "Av. Industrial 123, Lima, Perú",
      phone: "+51 1 345-6789",
      email: "logistica@contapack.com",
      hours: "24/7 Operaciones",
      type: "Logística",
      color: "from-primary-500 to-primary-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestras <span className="text-primary-600">Ubicaciones</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contamos con múltiples ubicaciones estratégicas para brindar el
            mejor servicio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${office.color} rounded-full flex items-center justify-center mb-4`}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {office.name}
                </h3>
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {office.type}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">
                    {office.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{office.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{office.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
