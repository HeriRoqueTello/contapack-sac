import { ProductCertifications } from "@/components/home/productos/info/ProductCertifications";
import { ProductGallery } from "@/components/home/productos/info/ProductGallery";
import { ProductHero } from "@/components/home/productos/info/ProductHero";
import { ProductMarkets } from "@/components/home/productos/info/ProductMarkets";
import { ProductQuality } from "@/components/home/productos/info/ProductQuality";
import { ProductSpecs } from "@/components/home/productos/info/ProductSpecs";
import { RelatedProducts } from "@/components/home/productos/info/RelatedProducts";
import { ProductsHero } from "@/components/home/productos/ProductsHero";
import { useParams } from "react-router";

// Datos de productos (se mantienen igual)
const productsData = {
  palta: {
    name: "Palta Hass",
    category: "Frutas",
    description:
      "Palta Hass premium de exportación, cultivada en los mejores valles del Perú con estrictos controles de calidad.",
    image: "/placeholder.svg?height=600&width=800",
    specs: {
      calibres: ["12", "14", "16", "18", "20", "22", "24"],
      temporada: "Marzo - Septiembre",
      origen: "Valles de Lima, La Libertad, Ica",
      empaque: "Cajas de 4kg, 10kg, 15kg",
      conservacion: "2-5°C, 85-90% HR",
    },
    quality: {
      brix: "8-12°",
      humedad: "70-80%",
      grasa: "15-25%",
      vida_util: "21-30 días",
      certificaciones: ["Global GAP", "HACCP", "BRC", "Orgánico"],
    },
    markets: ["Estados Unidos", "Europa", "Asia", "Canadá"],
    benefits: [
      "Alto contenido de grasas saludables",
      "Rico en vitaminas K, E, C",
      "Fuente de potasio y folato",
      "Antioxidantes naturales",
    ],
  },
  brocoli: {
    name: "Brócoli Premium",
    category: "Verduras",
    description:
      "Brócoli fresco de la más alta calidad, procesado con tecnología de punta para mantener sus propiedades nutricionales.",
    image: "/placeholder.svg?height=600&width=800",
    specs: {
      calibres: ["14-16cm", "16-18cm", "18-20cm"],
      temporada: "Todo el año",
      origen: "Valles de Arequipa, Lima",
      empaque: "Cajas de 5kg, 10kg",
      conservacion: "0-2°C, 95-98% HR",
    },
    quality: {
      color: "Verde intenso",
      textura: "Firme y compacta",
      vida_util: "14-21 días",
      procesamiento: "IQF disponible",
      certificaciones: ["Global GAP", "HACCP", "BRC", "Kosher"],
    },
    markets: ["Estados Unidos", "Europa", "Japón"],
    benefits: [
      "Alto contenido de vitamina C",
      "Rico en fibra dietética",
      "Fuente de vitamina K",
      "Propiedades antioxidantes",
    ],
  },
  esparragos: {
    name: "Espárragos Verdes",
    category: "Verduras",
    description:
      "Espárragos premium cultivados bajo estrictos estándares de calidad en los mejores suelos del Perú.",
    image: "/placeholder.svg?height=600&width=800",
    specs: {
      calibres: ["S", "M", "L", "XL", "XXL"],
      temporada: "Septiembre - Diciembre",
      origen: "Valles de Ica, La Libertad",
      empaque: "Cajas de 5.5kg, 11kg",
      conservacion: "2-4°C, 95% HR",
    },
    quality: {
      longitud: "15-22cm",
      diametro: "8-16mm",
      color: "Verde uniforme",
      vida_util: "14-21 días",
      certificaciones: ["Global GAP", "HACCP", "BRC", "Rainforest Alliance"],
    },
    markets: ["Estados Unidos", "Europa", "Reino Unido"],
    benefits: [
      "Bajo en calorías",
      "Rico en ácido fólico",
      "Fuente de vitamina K",
      "Propiedades diuréticas",
    ],
  },
  uvas: {
    name: "Uvas Red Globe",
    category: "Frutas",
    description:
      "Uvas frescas Red Globe de exportación, seleccionadas para mercados internacionales exigentes.",
    image: "/placeholder.svg?height=600&width=800",
    specs: {
      calibres: ["18mm", "20mm", "22mm", "24mm+"],
      temporada: "Diciembre - Abril",
      origen: "Valles de Ica, Piura",
      empaque: "Cajas de 8.2kg",
      conservacion: "-1 a 0°C, 90-95% HR",
    },
    quality: {
      brix: "16-18°",
      acidez: "0.6-0.8%",
      color: "Rojo intenso",
      vida_util: "45-60 días",
      certificaciones: ["Global GAP", "HACCP", "BRC", "GRASP"],
    },
    markets: ["Estados Unidos", "Europa", "Asia", "Canadá"],
    benefits: [
      "Alto contenido de antioxidantes",
      "Rico en vitamina C",
      "Fuente de potasio",
      "Resveratrol natural",
    ],
  },
};

export function ProductoView() {
  // 1. Usa el hook useParams para obtener el slug de la URL
  const { slug } = useParams();

  const product = productsData[slug];

  // 2. Maneja el caso de "no encontrado" manualmente
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          404 | Producto no encontrado
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductHero product={product} />
      <ProductSpecs product={product} />
      <ProductQuality product={product} />
      <ProductMarkets product={product} />
      <ProductGallery product={product} />
      <ProductCertifications product={product} />
      <RelatedProducts currentProduct={slug} />
    </div>
  );
}
