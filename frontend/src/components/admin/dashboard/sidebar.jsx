import { Button } from "@/components/ui/button";
import {
  Calendar,
  DonutIcon,
  Home,
  Inbox,
  Package,
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
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Produccion", "Recepcion", "Calidad"],
  },
  {
    title: "Recepción",
    icon: Inbox,
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Recepcion"],
    subItems: [
      {
        title: "Rótulo",
        icon: FileText,
        url: "recepcion/rotulo",
        allowedRoles: ["Administrador", "Encargado", "Personal"],
        allowedAreas: ["Sistemas", "Recepcion"],
      },
      {
        title: "Lote",
        icon: Boxes,
        url: "recepcion/lote",
        allowedRoles: ["Administrador", "Encargado", "Personal"],
        allowedAreas: ["Sistemas", "Recepcion"],
      },
    ],
  },
  {
    title: "Etiqueta",
    url: "taetiqueta",
    icon: Tag,
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Produccion", "Recepcion"],
  },
  {
    title: "Produccion",
    url: "produccion",
    icon: Calendar,
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Produccion"],
  },
  {
    title: "Anexo",
    url: "anexo",
    icon: DonutIcon,
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Produccion", "Recepcion", "Calidad"],
  },
  {
    title: "Embarque",
    url: "embarque",
    icon: Package,
    allowedRoles: ["Administrador", "Encargado", "Personal"],
    allowedAreas: ["Sistemas", "Produccion", "Recepcion"],
  },
];

export const Sidebar = ({ isOpen, onClose, data }) => {
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();

  const getUrl = (url) => (url === "" ? "/admin" : `/admin/${url}`);

  // Asegúrate de que data.Rol y data.Area existan antes de acceder a descripcion
  const rol = data?.Rol?.descripcion;
  const area = data?.Area?.descripcion;

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

  // Función para verificar si un elemento del menú debe ser visible para el usuario actual
  const canViewItem = (item) => {
    // Si no se definen roles o áreas específicas, es visible por defecto
    if (!item.allowedRoles && !item.allowedAreas) {
      return true;
    }

    let roleMatch = true;
    if (item.allowedRoles && rol) {
      roleMatch = item.allowedRoles.includes(rol);
    } else if (item.allowedRoles && !rol) {
      // Si se especifican roles para el ítem pero el usuario no tiene rol, ocúltalo
      roleMatch = false;
    }

    let areaMatch = true;
    if (item.allowedAreas && area) {
      areaMatch = item.allowedAreas.includes(area);
    } else if (item.allowedAreas && !area) {
      // Si se especifican áreas para el ítem pero el usuario no tiene área, ocúltalo
      areaMatch = false;
    }

    return roleMatch && areaMatch; // Tanto el rol como el área deben coincidir (si están definidos)
  };

  const renderMenu = () =>
    menuItems.map((item, index) => {
      // Verifica si el ítem principal debe ser visible
      if (!canViewItem(item)) {
        return null; // No renderiza si el usuario no tiene permiso
      }

      return (
        <div key={index}>
          {/* --- Parte 1: Ítems con submenú (como "Recepción") --- */}
          {item.subItems ? (
            <>
              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                className={`w-full px-4 py-2 flex items-center justify-between ${getActiveClass(
                  item.url
                )}`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-sm flex-grow text-left">
                  {item.title}
                </span>
                <ChevronDown
                  size={20}
                  className={`ml-2 transform transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {/* Submenú visible solo si está expandido */}
              {expanded && (
                <div className="pl-6 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => {
                    // Verifica si el sub-ítem debe ser visible
                    if (!canViewItem(subItem)) {
                      return null; // No renderiza si el usuario no tiene permiso
                    }
                    return (
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
                    );
                  })}
                </div>
              )}
            </>
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
        </div>
      );
    });

  return (
    <>
      {/* Sidebar para escritorio */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700 flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 pr-1" />
            ContaPack SAC
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">{renderMenu()}</nav>
      </div>

      {/* Sidebar para móvil */}
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
