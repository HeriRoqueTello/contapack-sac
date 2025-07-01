import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <SidebarTrigger />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
