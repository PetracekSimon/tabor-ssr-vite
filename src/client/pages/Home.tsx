import React from "react";
import Hero from "../components/Hero";
import ImageGallery from "../components/ImageGallery";

const Main = () => {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col h-screen">
      <Hero />
      <ImageGallery folder="2025" />
    </div>
  );
};

export default Main;
