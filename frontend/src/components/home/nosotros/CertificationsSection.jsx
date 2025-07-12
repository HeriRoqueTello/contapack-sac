import { Shield, Award, Leaf, Globe } from "lucide-react";

export function CertificationsSection() {
  const certifications = [
    {
      icon: Shield,
      name: "HACCP",
      description:
        "Sistema de Análisis de Peligros y Puntos Críticos de Control",
      year: "2025",
    },
    {
      icon: Award,
      name: "BRC",
      description:
        "British Retail Consortium - Estándar Global de Seguridad Alimentaria",
      year: "2024",
    },
    {
      icon: Globe,
      name: "Global GAP",
      description: "Buenas Prácticas Agrícolas reconocidas mundialmente",
      year: "2023",
    },
    {
      icon: Leaf,
      name: "Orgánico",
      description: "Certificación para productos orgánicos de exportación",
      year: "2022",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certificaciones
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro compromiso con la calidad está respaldado por las más
            importantes certificaciones internacionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-50 rounded-xl border border-primary-100 hover:bg-primary-100 transition-colors"
            >
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <cert.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {cert.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
              <div className="text-primary-600 font-semibold">
                Desde {cert.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
