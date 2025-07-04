import { Button } from "@/components/ui/button";

export function ProductCard({ name, description, image }) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Content */}
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            {name}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium cursor-pointer">
            Ver Detalles
          </Button>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
