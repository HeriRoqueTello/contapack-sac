import { Button } from "@/components/ui/button";
import { Bell, LogOut, Menu, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = ({ data, onMenuClick }) => {
  const navigate = useNavigate();

  const nombreCompleto = `${data.nombre} ${data.apellido}`;

  const getInitials = (fullName) => {
    if (!fullName) {
      return "";
    }

    return fullName
      .split(" ") // Divide el nombre por los espacios
      .filter((part) => part) // Elimina cualquier cadena vacía resultante de espacios extra
      .map((part) => part[0]) // Mapea cada parte para obtener solo su primera letra
      .join("") // Une todas las letras en una sola cadena
      .toUpperCase(); // Convierte el resultado a mayúsculas
  };

  function removeAuthTokenFromLocalStorage() {
    try {
      localStorage.removeItem("AUTH_TOKEN");
      console.log("AUTH_TOKEN eliminado del localStorage.");
      navigate("/");
    } catch (error) {
      // Captura cualquier error que pueda ocurrir al acceder a localStorage
      // (ej. si localStorage no está disponible en el entorno, o problemas de seguridad)
      console.error(
        "Error al intentar eliminar AUTH_TOKEN del localStorage:",
        error
      );
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-2"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">
            Panel de Control Contapack
          </h1>
          <h1 className="text-lg font-bold text-gray-800 sm:hidden">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 flex items-center gap-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Usuario"
                  />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {getInitials(nombreCompleto)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">
                  {nombreCompleto}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {nombreCompleto}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {data.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Rol</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={removeAuthTokenFromLocalStorage}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
