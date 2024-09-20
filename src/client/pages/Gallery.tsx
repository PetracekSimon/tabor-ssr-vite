import PageTitle from "../components/PageTitle";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";

/**
 * Galerie - v navigaci je jako "Galerie" - url "/galerie"
 * @returns 
 */
const Gallery = () => {

    const { folder } = useParams();

    return (
        <>
        <PageTitle title={"Galerie"} />
        <div className="flex bg-white-100 font-sans items-center flex-col">
            <Hero title="Galerie" subtitle="Stanový tábor Kamenná" background="/assets/dummy.jpg" />
            <ImageGallery folder={folder ? folder : "root"} />
        </div>
        </>
    );
};

export default Gallery;
