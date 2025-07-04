import { getUser } from "@/api/api";
import { AppSidebar } from "@/components/admin/AppSidebar";
import Loader from "@/components/ui/Loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

export function AdminLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to={"/auth/login"} />;

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <main className="flex flex-1 flex-col">
        <SidebarTrigger />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
