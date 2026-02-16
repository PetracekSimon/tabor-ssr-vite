import { StrictMode, useEffect, useState } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import CourseCamp from "./pages/CourseCamp";
import IWantToGo from "./pages/IWantToGo";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGallery from "./pages/admin/AdminGallery";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminSettings from "./pages/admin/AdminSetting";
import AdminHome from "./pages/admin/AdminHome";
import NotFound from "./pages/404";
import ScrollToTop from "./ScrollToTop";
import 'react-toastify/dist/ReactToastify.min.css';
import ClientToastContainer from "./components/ClientToastContainer";
import { initializeAuth } from "./ZustandContext";
import ApplicationPage from "./pages/Application";
import AdminApplications from "./pages/admin/AdminApplications";

const container = document.getElementById("app");
interface FullAppProps {
  initialData?: any;
}
const FullApp = (initialData: FullAppProps) => {

  useEffect(() => {
    initializeAuth();
  }, []);


  return (
    <StrictMode>

      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout><Outlet /></PublicLayout>}>
            <Route path="/" element={<Home initialData={initialData} />} />

            <Route path="/prihlaska" element={<ApplicationPage />} />
            <Route path="/prihlaska/" element={<ApplicationPage />} />

            <Route path="/o-tabore" element={<About />} />
            <Route path="/o-tabore/" element={<About />} />
            <Route path="/o-tabore/etapova-hra" element={<About />} />
            <Route path="/o-tabore/etapova-hra/" element={<About />} />
            <Route path="/o-tabore/historie" element={<About />} />
            <Route path="/o-tabore/historie/" element={<About />} />

            <Route path="/prubeh-tabora" element={<CourseCamp />} />
            <Route path="/prubeh-tabora/" element={<CourseCamp />} />
            <Route path="/prubeh-tabora/co-nebrat" element={<CourseCamp />} />
            <Route path="/prubeh-tabora/co-nebrat/" element={<CourseCamp />} />
            <Route path="/prubeh-tabora/hygiena-a-zdravi" element={<CourseCamp />} />
            <Route path="/prubeh-tabora/hygiena-a-zdravi/" element={<CourseCamp />} />

            <Route path="/chci-jet" element={<IWantToGo />} />
            <Route path="/chci-jet/" element={<IWantToGo />} />
            <Route path="/chci-jet/vseobecne-informace" element={<IWantToGo />} />
            <Route path="/chci-jet/vseobecne-informace/" element={<IWantToGo />} />
            <Route path="/chci-jet/seznam-veci" element={<IWantToGo />} />
            <Route path="/chci-jet/seznam-veci/" element={<IWantToGo />} />
            <Route path="/chci-jet/prihlaska" element={<IWantToGo />} />
            <Route path="/chci-jet/prihlaska/" element={<IWantToGo />} />
            <Route path="/chci-jet/storno-podminky" element={<IWantToGo />} />
            <Route path="/chci-jet/storno-podminky/" element={<IWantToGo />} />

            <Route path="/galerie" element={<Gallery />} />
            <Route path="/galerie/:folder" element={<Gallery />} />


            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* TODO: přehodit do normálně public routes */}
            <Route path="/admin/test-prihlaska" element={<ApplicationPage />} />
          </Route>
        </Routes>

        <ClientToastContainer />
      </BrowserRouter>

    </StrictMode>
  )
};

if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container!);
  root.render(<FullApp />);
} else {
  hydrateRoot(container!, <FullApp initialData={(window as any).__INITIAL_DATA__} />);
}
