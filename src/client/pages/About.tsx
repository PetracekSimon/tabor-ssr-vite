import Hero from "../components/Hero";
import ImageGallery from "../components/ImageGallery";
import PageTitle from "../components/PageTitle";

/**
 * O táboře - v navigaci je jako "O táboře" - url "/o-taboru"
 * @returns 
 */
const About = () => {
  return (
    <>
      <PageTitle title={"O táboře"} />
      <div className="flex bg-white-100 font-sans items-center flex-col">
        <Hero title="O táboře" subtitle="Stanový tábor Kamenná" background="/assets/dummy.jpg" />
        <ImageGallery folder="root" />
      </div>
    </>
  );
};

export default About;
