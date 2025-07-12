import { Shield, Microscope, FileCheck, Award } from "lucide-react";

export function QualityService() {
  const qualitySteps = [
    {
      icon: Microscope,
      title: "Análisis de Laboratorio",
      description: "Pruebas fisicoquímicas y microbiológicas completas",
      tests: [
        "Análisis microbiológico",
        "Pruebas de residuos",
        "Análisis nutricional",
        "Control de pH y Brix",
      ],
    },
    {
      icon: Shield,
      title: "Inspección Visual",
      description: "Control exhaustivo de apariencia y defectos",
      tests: [
        "Control de color",
        "Detección de defectos",
        "Verificación de calibre",
        "Estado de madurez",
      ],
    },
    {
      icon: FileCheck,
      title: "Documentación",
      description: "Registro completo de todos los procesos",
      tests: [
        "Certificados de calidad",
        "Trazabilidad completa",
        "Reportes de análisis",
        "Documentos de exportación",
      ],
    },
    {
      icon: Award,
      title: "Certificación",
      description: "Validación por organismos certificadores internacionales",
      tests: ["Global GAP", "HACCP", "BRC", "Certificación Orgánica"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Control de <span className="text-primary-600">Calidad</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sistemas rigurosos de control de calidad que garantizan la
            excelencia en cada producto que procesamos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {qualitySteps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 hover:shadow-primary-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
              <ul className="space-y-2">
                {step.tests.map((test, testIndex) => (
                  <li key={testIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{test}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quality Standards */}
        <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Estándares de Calidad
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                metric: "99.8%",
                label: "Productos aprobados",
                description: "Tasa de aprobación en controles",
              },
              {
                metric: "< 0.01%",
                label: "Índice de defectos",
                description: "Productos con defectos detectados",
              },
              {
                metric: "100%",
                label: "Trazabilidad",
                description: "Seguimiento completo del producto",
              },
            ].map((standard, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {standard.metric}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {standard.label}
                </div>
                <div className="text-sm text-gray-600">
                  {standard.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
