import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log({ product });
  // Simulated gallery images
  const galleryImages = [...product.images];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galería de Imágenes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce más sobre nuestro {product.name.toLowerCase()} a través de
            estas imágenes
          </p>
        </div>

        {/* Main Image */}
        <div className="relative mb-8">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={galleryImages[selectedImage] || "/placeholder.svg"}
              alt={`${product.name} - Imagen ${selectedImage + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-6 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-gray-200 hover:border-primary-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={galleryImages[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} - Imagen ampliada`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
