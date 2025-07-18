import { BrowserRouter, Route, Routes } from "react-router";
import { HomeView } from "@/views/HomeView";
import { HomeLayout } from "./layout/HomeLayout";
import { LoginView } from "./views/LoginView";
import { DashboardView } from "./views/DashboardView";
import { AdminLayout } from "./layout/AdminLayout";
import { EmbarqueView } from "./views/EmbarqueView";
import { AnexoView } from "./views/AnexoView";
import { EtiquetaView } from "./views/EtiquetaView";
import { NotFound } from "./views/NotFound";
import { NosotrosView } from "./views/NosotrosView";
import { ProductosView } from "./views/ProductosView";
import { ServiciosView } from "./views/ServiciosView";
import { ContactoView } from "./views/ContactoView";
import { ProductoView } from "./views/ProductoView";
import ScrollToTop from "./hooks/ScrollToTop";
import { ProduccionView } from "./views/ProduccionView";
import { RotuloView } from "./views/RotuloView";
import { LoteView } from "./views/LoteView";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardView />} />
          <Route path="embarque" element={<EmbarqueView />} />
          <Route path="anexo" element={<AnexoView />} />
          <Route path="taetiqueta" element={<EtiquetaView />} />
          <Route path="produccion" element={<ProduccionView />} />
          <Route path="recepcion/rotulo" element={<RotuloView />} />
          <Route path="recepcion/lote" element={<LoteView />} />
        </Route>

        <Route path="/auth/login" element={<LoginView />} />

        <Route path="/" element={<HomeLayout />}>
          <Route element={<HomeView />} index />
          <Route path="nosotros" element={<NosotrosView />} />
          <Route path="servicios" element={<ServiciosView />} />
          <Route path="contacto" element={<ContactoView />} />
          <Route path="productos" element={<ProductosView />} />
          <Route path="productos/:slug" element={<ProductoView />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
