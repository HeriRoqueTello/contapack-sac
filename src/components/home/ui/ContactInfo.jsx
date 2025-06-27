import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Av. Industrial 123, Lima, Perú",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@contapack.com",
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lun - Vie: 8:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Información de contacto
      </h3>
      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <detail.icon className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{detail.title}</h4>
              <p className="text-gray-600">{detail.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
