import React from "react";
import Hero from "../components/Hero";
import ImageGallery from "../components/ImageGallery";

/**
 * O táboře - v navigaci je jako "O táboře" - url "/o-taboru"
 * @returns 
 */
const About = () => {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col h-screen">
      <Hero title="O táboře" subtitle="Stanový tábor Kamenná" background="/assets/dummy.jpg" />
      <ImageGallery folder="root" />
    </div>
  );
};

export default About;
