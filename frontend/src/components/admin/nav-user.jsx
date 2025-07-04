import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  console.log(user);
  const navigate = useNavigate();

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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.Nombres} />
                <AvatarFallback className="rounded-lg">
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.Nombres}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.rol}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem>
              <User />
              {user.Email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={removeAuthTokenFromLocalStorage}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
