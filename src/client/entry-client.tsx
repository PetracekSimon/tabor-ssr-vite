import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ContextWrapper } from "./Context";
import Home from "./pages/Home";

const container = document.getElementById("app");

const FullApp = () => (
  <React.StrictMode>
    <ContextWrapper>
      <BrowserRouter basename="/" >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-taboru" element={<Home />} />
          <Route path="/kontakt" element={<Home />} />
          <Route path="/prihlaseni" element={<Home />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ContextWrapper>
  </React.StrictMode>
);

if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container!);
  root.render(<FullApp />);
} else {
  hydrateRoot(container!, <FullApp />);
}
