import { useEffect, useState } from "react";
import { Api, ListResponse, Image } from "../api";
import { AxiosResponse } from "axios";
import Loading from "./Loading";

type ImageGalleryProps = {
    folder: string;
};

interface ImageGalleryStructure {
    folderName: string,
    images: Image[]
}

const ImageGallery = (props: ImageGalleryProps) => {

    const api = new Api();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [imageStructure, setImageStucture] = useState<Array<ImageGalleryStructure>>([]);

    useEffect(() => {
        setImageStucture([]);
        setIsLoading(true);

        const fetchFolders = async () => {
            let _imageStructure: Array<ImageGalleryStructure> = [];
            try {
                const test = await api.getImagesForGalleryPage({ filter: { code: props.folder } });
                _imageStructure = test.data;
            } catch (error) {
                console.error("Chyba při načítání složek:", error);
            }

            setImageStucture(_imageStructure);
            setIsLoading(false);
        };

        fetchFolders();
    }, [props.folder]);


    const createImages = (images: Image[]) => {
        const imagesHTML = images.map(image =>
            <div className="image-gallery__item" key={image._id}>
                <img src={"/api/image/" + image._id} alt={image.filename} />
                <span>{image.description}</span>
            </div>
        );

        return imagesHTML;
    }

    return <div className="image-gallery-wrapper">
        {isLoading && (<Loading />)}
        {imageStructure.map((item) => (
            <div key={item.folderName} className="mt-5">
                <h2 className="text-left text-2xl font-bold text-butter-cup">{item.folderName}</h2>
                <hr className="border-t border-gray-300 my-4" />
                <div className="image-gallery mb-10">
                    {createImages(item.images)}
                </div>
            </div>
        ))}
    </div>;
};

export default ImageGallery;