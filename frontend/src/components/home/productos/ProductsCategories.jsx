import { Apple, Carrot } from "lucide-react";

export function ProductsCategories() {
  const categories = [
    {
      icon: Apple,
      name: "Frutas",
      description: "Frutas frescas de exportación",
      count: 2,
      color: "from-primary-400 to-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200",
    },
    {
      icon: Carrot,
      name: "Verduras",
      description: "Verduras premium procesadas",
      count: 2,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-100",
      borderColor: "border-primary-300",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorías de <span className="text-primary-600">Productos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Organizamos nuestros productos en categorías especializadas para
            facilitar tu búsqueda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-8 text-center hover:shadow-primary-lg transition-all duration-300 hover:scale-105`}
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <category.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {category.count} productos disponibles
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
