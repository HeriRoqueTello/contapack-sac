import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Outlet } from "react-router";

export function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
