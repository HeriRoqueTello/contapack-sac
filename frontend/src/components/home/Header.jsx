import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "" },
    { name: "Nosotros", href: "nosotros" },
    { name: "Servicios", href: "servicios" },
    { name: "Productos", href: "productos" },
    { name: "Contacto", href: "contacto" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/logo.svg" className="text-white font-bold text-sm" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Conta Pack SAC
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href == "/productos"}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 after:transition-all after:duration-200 hover:after:w-full cursor-pointer ${
                    isActive
                      ? "text-green-700 after:w-full after:bg-green-700" // Estilo activo
                      : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link to="/auth/login">
              <Button className="gradient-primary text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                Acceder
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href == "/productos"}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200" // Estilo activo para móvil
                        : "text-gray-700 hover:text-primary-600 hover:bg-primary-50" // Estilo inactivo
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Link to="/auth/login">
                <Button className="gradient-primary text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                  Acceder
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
