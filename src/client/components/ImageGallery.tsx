import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import { Api, Image } from "../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";

type ImageGalleryProps = {
    folder: string;
};

interface ImageGalleryStructure {
    folderCode: string,
    folderName: string,
    images: Image[]
}

const ImageGallery = (props: ImageGalleryProps) => {

    const api = new Api();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [index, setIndex] = useState(-1);

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
    const createFolderTitle = (folderName: string, folderCode: string) => {
        if (props.folder === "root") {
            return <Link className="text-left text-2xl font-bold text-butter-cup" to={"/galerie/" + folderCode}>{folderName}</Link>
        }
        return <h2 className="text-left text-2xl font-bold text-butter-cup">{folderName}</h2>
    }

    const mapImageToPhoto = (images: Image[]): Photo[] => {

        //@ts-expect-error
        const photos: Photo[] = images.map(image => {
            return {
                src: "/api/image/" + image._id,
                href: "/api/image/" + image._id,
                width: image.width,
                height: image.height,
                alt: image._id,
                key: image._id,
                srcSet: {},
                label: image.description,
                title: image.description
            }
        });

        return photos;
    }

    return <div className="container mx-auto">
        {isLoading && <Loading />}

        {imageStructure.map((item) => (
            <div key={item.folderName} className="mt-5">
                {createFolderTitle(item.folderName, item.folderCode)}
                <hr className="border-t border-gray-300 my-4" />
                {/* {props.folder !== "root" && (
                    <div className="image-gallery mb-10">
                        {createImages(item.images)}
                    </div>
                )} */}
                <RowsPhotoAlbum
                    photos={mapImageToPhoto(item.images)}
                    targetRowHeight={200}
                    onClick={({ index: current }) => setIndex(current)}
                />
                <Lightbox
                    index={index}
                    slides={mapImageToPhoto(item.images)}
                    open={index >= 0}
                    close={() => setIndex(-1)}
                />
            </div>
        ))}
    </div>;
};

export default ImageGallery;