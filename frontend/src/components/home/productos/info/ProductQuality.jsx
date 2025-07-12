import { Award, Beaker, Shield, Leaf } from "lucide-react";

export function ProductQuality({ product }) {
  const qualityMetrics = Object.entries(product.quality).filter(
    ([key]) => key !== "certificaciones"
  );

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Control de Calidad
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Rigurosos estándares de calidad que garantizan la excelencia de
            nuestros productos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quality Metrics */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Parámetros de Calidad
            </h3>
            <div className="space-y-4">
              {qualityMetrics.map(([key, value], index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary-100"
                >
                  <span className="font-medium text-gray-900 capitalize">
                    {key.replace("_", " ")}
                  </span>
                  <span className="text-primary-600 font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Beneficios Nutricionales
            </h3>
            <div className="space-y-4">
              {product.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-primary-100"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-3 h-3 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Process */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Proceso de Control de Calidad
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Beaker,
                title: "Análisis de Laboratorio",
                desc: "Pruebas fisicoquímicas y microbiológicas",
              },
              {
                icon: Shield,
                title: "Inspección Visual",
                desc: "Control de apariencia y defectos",
              },
              {
                icon: Award,
                title: "Certificación",
                desc: "Validación por organismos certificadores",
              },
              {
                icon: Leaf,
                title: "Trazabilidad",
                desc: "Seguimiento desde origen hasta destino",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
