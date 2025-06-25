import PageTitle from "../components/PageTitle";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import config from "../../config";

/**
 * Galerie - v navigaci je jako "Galerie" - url "/galerie"
 * @returns 
 */
const Gallery = () => {

    const { folder } = useParams();

    return (
        <>
        <PageTitle title={" | Galerie"} />
        <div className="flex bg-white-100 font-sans items-center flex-col">
            <Hero title="Galerie" subtitle={config.heroSubtitle} background="/assets/hero.jpg" />
            <ImageGallery folder={folder ? folder : "root"} />
        </div>
        </>
    );
};

export default Gallery;
