import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CourseCamp from "./pages/CourseCamp";
import IWantToGo from "./pages/IWantToGo";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSettings from "./pages/admin/AdminSetting";
import AdminHome from "./pages/admin/AdminHome";
import NotFound from "./pages/404";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

export function render(url: string) {
  
  return ReactDOMServer.renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route element={<PublicLayout><Outlet /></PublicLayout>}>
            <Route path="/" element={<Home />} />
            <Route path="/o-tabore" element={<About />} />
            <Route path="/prubeh-tabora" element={<CourseCamp />} />
            <Route path="/chci-jet" element={<IWantToGo />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/galerie/:folder" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/galerie" element={<AdminGallery />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </StaticRouter>
    </StrictMode>
  );
}
