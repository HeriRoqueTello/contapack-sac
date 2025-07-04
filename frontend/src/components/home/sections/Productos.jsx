"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ProductCard } from "../ui/ProductCard";
import { Button } from "@/components/ui/button";

export function Productos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      name: "Palta",
      description:
        "Palta premium seleccionados para mercados nacionales e internacionales.",
      image: "/palta.jpg",
    },
    {
      name: "Uvas",
      description:
        "Uvas frescas seleccionadas para exportación a mercados internacionales.",
      image: "/uvas.png",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Productos"
          subtitle="Descubre nuestra amplia gama de productos agrícolas de exportación"
        />

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-lg cursor-pointer"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-gray-200 shadow-lg cursor-pointer"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary-600" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
