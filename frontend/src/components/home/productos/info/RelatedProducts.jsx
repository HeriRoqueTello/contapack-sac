import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function RelatedProducts({ currentProduct }) {
  const allProducts = [
    {
      slug: "palta",
      name: "Palta Hass",
      category: "Frutas",
      image: "/palta-hass.jpg",
    },
    {
      slug: "brocoli",
      name: "Brócoli Premium",
      category: "Verduras",
      image: "/brocoli.jpeg",
    },
    {
      slug: "esparragos",
      name: "Espárragos Verdes",
      category: "Verduras",
      image: "/esparragos.jpg",
    },
    {
      slug: "uvas",
      name: "Uvas Red Globe",
      category: "Frutas",
      image: "/uvas-principal.jpg",
    },
  ];

  const relatedProducts = allProducts.filter(
    (product) => product.slug !== currentProduct
  );

  return (
    <section className="py-20 bg-primary-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productos Relacionados
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre otros productos de nuestra línea premium
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <Link to={`/productos/${product.slug}`}>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                    Ver Producto
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
