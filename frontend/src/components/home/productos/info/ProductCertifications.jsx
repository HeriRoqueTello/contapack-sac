import { Shield, Award, Leaf, Globe, CheckCircle } from "lucide-react";

export function ProductCertifications({ product }) {
  const certificationIcons = {
    "Global GAP": Globe,
    HACCP: Shield,
    BRC: Award,
    Orgánico: Leaf,
    Kosher: CheckCircle,
    "Rainforest Alliance": Leaf,
    GRASP: Globe,
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certificaciones
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro compromiso con la calidad está respaldado por
            certificaciones internacionales
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {product.quality.certificaciones.map((cert, index) => {
            const IconComponent = certificationIcons[cert] || Shield;
            return (
              <div
                key={index}
                className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100 hover:bg-primary-100 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{cert}</h3>
              </div>
            );
          })}
        </div>

        {/* Certification Benefits */}
        <div className="bg-secondary-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            ¿Qué garantizan nuestras certificaciones?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Seguridad alimentaria garantizada",
              "Trazabilidad completa del producto",
              "Prácticas agrícolas sostenibles",
              "Cumplimiento de estándares internacionales",
              "Responsabilidad social empresarial",
              "Protección del medio ambiente",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
