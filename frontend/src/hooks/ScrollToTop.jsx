import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Desplaza la ventana a la parte superior cuando la ruta cambia
    window.scrollTo(0, 0);
  }, [pathname]); // 2. El efecto se ejecuta cada vez que el 'pathname' cambia

  return null; // Este componente no renderiza nada, solo maneja un efecto secundario
}
