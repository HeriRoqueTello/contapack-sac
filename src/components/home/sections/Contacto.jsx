import { MapPin } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ContactForm } from "../ui/ContactForm";
import { ContactInfo } from "../ui/ContactInfo";

export function Contacto() {
  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Contacto"
          subtitle="Ponte en contacto con nosotros para conocer más sobre nuestros productos y servicios"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Envíanos un mensaje
            </h3>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <ContactInfo />

            {/* Mapa */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
