import { Button } from "@/components/ui/button";
import {
  Calendar,
  DonutIcon,
  Home,
  Inbox,
  Package,
  Search,
  Tag,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const menuItems = [
  {
    title: "Inicio",
    url: "",
    icon: Home,
  },
  {
    title: "Recepcion",
    url: "recepcion",
    icon: Inbox,
  },
  {
    title: "Produccion",
    url: "produccion",
    icon: Calendar,
  },
  {
    title: "Calidad",
    url: "calidad",
    icon: Search,
  },
  {
    title: "Anexo",
    url: "anexo",
    icon: DonutIcon,
  },
  {
    title: "Embarque",
    url: "embarque",
    icon: Package,
  },
  {
    title: "Etiqueta",
    url: "taetiqueta",
    icon: Tag,
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const getUrl = (url) => (url === "" ? "/admin" : `/admin/${url}`);

  const isActive = (url) => {
    const fullPath = getUrl(url);

    if (fullPath === "/admin") {
      return location.pathname === fullPath;
    }

    // Usa 'startsWith' para manejar rutas anidadas (ej. /admin/produccion/detalles)
    return location.pathname.startsWith(fullPath);
  };

  const getActiveClass = (url) =>
    isActive(url)
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "text-gray-600 hover:bg-gray-100";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700 flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 pr-1" />
            ContaPack SAC
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              asChild
              variant={isActive(item.url) ? "default" : "ghost"}
              className={`w-full justify-start ${getActiveClass(item.url)}`}
            >
              <Link className="flex items-center" to={getUrl(item.url)}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700">Panel Contapack</h1>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              asChild
              variant={isActive(item.url) ? "default" : "ghost"}
              className={`w-full justify-start ${getActiveClass(item.url)}`}
            >
              <Link className="flex items-center" to={getUrl(item.url)}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
};
