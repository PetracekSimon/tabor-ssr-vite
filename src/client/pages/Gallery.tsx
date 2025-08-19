import PageTitle from "../components/PageTitle";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import config from "../../config";

/**
 * Galerie - v navigaci je jako "Galerie" - url "/galerie"
 * @returns 
 */
const oldYears = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024"
];
const Gallery = () => {

    const { folder } = useParams();

    return (
        <>
            <PageTitle />
            <div className="flex bg-white-100 font-sans items-center flex-col">
                <Hero title="Galerie" subtitle={config.heroSubtitle} background="/assets/hero.jpg" />
                {folder && oldYears.includes(folder) ? (
                    <p className="text-xl text-center mt-4 mb-8">Fotografie z roku {folder} jsou k dispozici, ale zatím je nikdo nenahrál na web.</p>
                ) : (
                    <ImageGallery folder={folder ? folder : "root"} />
                )}
            </div>
        </>
    );
};

export default Gallery;
