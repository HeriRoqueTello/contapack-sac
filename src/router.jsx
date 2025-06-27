import { BrowserRouter, Route, Routes } from "react-router";
import { HomeView } from "@/views/HomeView";
import { HomeLayout } from "./layout/HomeLayout";
import { LoginView } from "./views/LoginView";
import { DashboardView } from "./views/DashboardView";
import { AdminLayout } from "./layout/AdminLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginView />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardView />} />
          {/* <Route path="profile" element={<ProfileView />} /> */}
        </Route>

        {/* <Route path="/:handle" element={<AuthLayout />}>
          <Route element={<HandleView />} index={true} />
        </Route> a*/}

        <Route path="/" element={<HomeLayout />}>
          <Route element={<HomeView />} index />
        </Route>

        {/* <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
