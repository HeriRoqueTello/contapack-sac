import { ProductsCategories } from "@/components/home/productos/ProductsCategories";
import { ProductsGrid } from "@/components/home/productos/ProductsGrid";
import { ProductsHero } from "@/components/home/productos/ProductsHero";
import { ProductsStats } from "@/components/home/productos/ProductsStats";

export default function ProductosView() {
  return (
    <div className="min-h-screen bg-white">
      <ProductsHero />
      <ProductsCategories />
      <ProductsGrid />
      <ProductsStats />
    </div>
  );
}
