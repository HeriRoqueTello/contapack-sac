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
  ChevronDown,
  FileText,
  Boxes,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const menuItems = [
  {
    title: "Inicio",
    url: "",
    icon: Home,
  },
  {
    title: "Recepción",
    icon: Inbox,
    subItems: [
      { title: "Rótulo", icon: FileText, url: "recepcion/rotulo" },
      { title: "Lote", icon: Boxes, url: "recepcion/lote" },
    ],
  },
  {
    title: "Etiqueta",
    url: "taetiqueta",
    icon: Tag,
  },
  {
    title: "Produccion",
    url: "produccion",
    icon: Calendar,
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
];

export const Sidebar = ({ isOpen, onClose }) => {
  const [expanded, setExpanded] = useState(false);

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

  const renderMenu = () =>
    menuItems.map((item, index) => (
      <div key={index}>
        {/* --- Parte 1: Ítems con submenú (como "Recepción") --- */}
        {item.subItems ? (
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start ${
              expanded
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Button
              onClick={() => setExpanded(!expanded)}
              variant="ghost"
              className={`w-full px-4 py-2 flex items-center justify-between ${getActiveClass(
                item.url
              )}`}
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />

              <span className="text-sm flex-grow text-left">{item.title}</span>

              <ChevronDown
                size={20}
                className={`ml-2 transform transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </Button>
          </Button>
        ) : (
          // --- Parte 2: Ítems normales que redirigen directamente ---
          <Button
            asChild
            variant={isActive(item.url) ? "default" : "ghost"}
            className={`w-full justify-start ${getActiveClass(item.url)}`}
          >
            <Link className="flex items-center" to={getUrl(item.url)}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          </Button>
        )}

        {/* Submenú visible solo si está expandido */}
        {item.subItems && expanded && (
          <div className="pl-6 mt-1 space-y-1">
            {item.subItems.map((subItem, subIndex) => (
              <Button
                key={subIndex}
                asChild
                variant={isActive(subItem.url) ? "default" : "ghost"}
                className={`w-full justify-start text-sm ${getActiveClass(
                  subItem.url
                )} hover:bg-green-100 hover:text-green-700`}
              >
                <Link
                  to={getUrl(subItem.url)}
                  className="flex items-center gap-2"
                >
                  {subItem.icon && (
                    <subItem.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span>{subItem.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    ));

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
        <nav className="flex-1 px-4 py-6 space-y-2">{renderMenu()}</nav>
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
        <nav className="flex-1 px-4 py-6 space-y-2">{renderMenu()}</nav>
      </div>
    </>
  );
};
