import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Mail, Building, MessageSquare } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    productInterest: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-gray-600">
                Completa el formulario y te responderemos pronto
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600" />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <select
                name="productInterest"
                value={formData.productInterest}
                onChange={handleChange}
                className="w-full p-3 border border-primary-200 rounded-lg focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Producto de interés</option>
                <option value="palta">Palta Hass</option>
                <option value="brocoli">Brócoli Premium</option>
                <option value="esparragos">Espárragos Verdes</option>
                <option value="uvas">Uvas Red Globe</option>
                <option value="todos">Todos los productos</option>
              </select>

              <Input
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formData.subject}
                onChange={handleChange}
                className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                required
              />

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-primary-600" />
                <Textarea
                  name="message"
                  placeholder="Mensaje"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-primary"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir{" "}
                <span className="text-primary-600">ContaPack SAC</span>?
              </h3>
              <div className="space-y-4">
                {[
                  "Más de 3 años de experiencia en agroindustria",
                  "Certificaciones internacionales de calidad",
                  "Presencia en más de 50 países",
                  "Tecnología de punta en procesamiento",
                  "Compromiso con la sostenibilidad",
                  "Atención personalizada 24/7",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Tiempo de respuesta
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Email</span>
                  <span className="text-primary-600 font-semibold">
                    24 horas
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Teléfono</span>
                  <span className="text-primary-600 font-semibold">
                    Inmediato
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cotizaciones</span>
                  <span className="text-primary-600 font-semibold">
                    48 horas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
