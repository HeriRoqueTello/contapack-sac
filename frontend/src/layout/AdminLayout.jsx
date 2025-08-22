import { getUser } from "@/api/api";
import { Navbar } from "@/components/admin/dashboard/navbar";
import { Sidebar } from "@/components/admin/dashboard/sidebar";
import Loader from "@/components/ui/Loader";
import { useAuthStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export function AdminLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    refetchOnWindowFocus: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setProfile } = useAuthStore();
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);
  if (isLoading) return <Loader />;
  if (isError) return <Navigate to={"/auth/login"} />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        data={data}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-scroll overflow-x-hidden px-4">
        <Navbar data={data} onMenuClick={() => setSidebarOpen(true)} />
        <div className="py-4">
          <Outlet />
        </div>
      </div>

      {/* mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
