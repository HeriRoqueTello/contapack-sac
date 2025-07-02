import {
  Calendar,
  DonutIcon,
  Home,
  Inbox,
  Package,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { NavUser } from "./nav-user";

const user = {
  name: "contapack",
  email: "m@contapack.com",
  avatar: "#",
  shortname: "CP",
  rol: "encargado",
};

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "#",
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
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <img src="/logo.svg" alt="Logo" className="w-6 h-6 pr-1" />
            ContaPack SAC
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={`/admin/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
