import { BrowserRouter, Route, Routes } from "react-router";
import { HomeView } from "@/views/HomeView";
import { HomeLayout } from "./layout/HomeLayout";
import { LoginView } from "./views/LoginView";
import { DashboardView } from "./views/DashboardView";
import { AdminLayout } from "./layout/AdminLayout";
import { EmbarqueView } from "./views/EmbarqueView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginView />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index={true} element={<DashboardView />} />
          <Route path="embarque" element={<EmbarqueView />} />
        </Route>

        {/* <Route path="/:handle" element={<AuthLayout />}>
          <Route element={<HandleView />} index={true} />
        </Route> a*/}

        <Route path="/" element={<HomeLayout />}>
          <Route element={<HomeView />} index={true} />
        </Route>

        {/* <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
