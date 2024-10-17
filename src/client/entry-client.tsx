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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const container = document.getElementById("app");

const FullApp = () => {

  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  useEffect(() => {
    // Funkce, která zkontroluje, jestli <html> element obsahuje třídu "dark"
    const checkTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    // Při prvním renderu zkontrolujeme aktuální theme
    checkTheme();
    // Optionálně můžeš přidat listener pro změny třídy "dark" v <html> elementu (například při změně pomocí tlačítka).
    // Příklad: naslouchání změně tématu
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Cleanup funkce, která se provede při unmountu a odstraní observer
    return () => observer.disconnect();
  }, []);


  return (
    <StrictMode>

      <BrowserRouter basename="/">
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

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme} />

      </BrowserRouter>

    </StrictMode>
  )
};

if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container!);
  root.render(<FullApp />);
} else {
  hydrateRoot(container!, <FullApp />);
}
