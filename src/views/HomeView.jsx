import { Contacto } from "@/components/home/sections/Contacto";
import { Hero } from "@/components/home/sections/Hero";
import { Nosotros } from "@/components/home/sections/Nosotros";
import { Productos } from "@/components/home/sections/Productos";
import { Servicios } from "@/components/home/sections/Servicios";

export function HomeView() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Servicios />
      <Productos />
      <Contacto />
    </>
  );
}
