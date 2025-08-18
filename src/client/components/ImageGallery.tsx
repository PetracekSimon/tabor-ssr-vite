import { useEffect, useState } from "react";
import { Photo, RenderImageProps, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import { Api, Image } from "../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ImageWrapper from "./ImageWrapper";
import Lightbox from "./Lightbox";
import { useAppStore } from "../ZustandContext";

type ImageGalleryProps = {
    folder: string;
};

interface ImageGalleryStructure {
    folderCode: string,
    folderName: string,
    folderIsVisible: boolean,
    images: Image[]
}

const ImageGallery = (props: ImageGalleryProps) => {

    const api = new Api();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [index, setIndex] = useState(-1);

    const [imageStructure, setImageStucture] = useState<Array<ImageGalleryStructure>>([]);

    const { token } = useAppStore();

    useEffect(() => {
        setImageStucture([]);
        setIsLoading(true);

        const fetchFolders = async () => {
            let _imageStructure: Array<ImageGalleryStructure> = [];
            try {
                const test = await api.getImagesForGalleryPage({ filter: { code: props.folder } }, token);
                _imageStructure = test.data;
            } catch (error) {
                console.error("Chyba při načítání složek:", error);
            }

            setImageStucture(_imageStructure);
            setIsLoading(false);
        };

        fetchFolders();
    }, [props.folder]);


    const createFolderTitle = (folderName: string, folderCode: string, folderIsVisible: boolean) => {
        if (props.folder === "root") {
            return <Link className={`text-left text-2xl font-bold ${folderIsVisible ? "text-butter-cup" : "text-gray-400"}`} to={"/galerie/" + folderCode}>{folderName}</Link>
        }
        return <h2 className={`text-left text-2xl font-bold ${folderIsVisible ? "text-butter-cup" : "text-gray-400"}`}>{folderName}</h2>
    }

    const mapImageToPhoto = (images: Image[]): Photo[] => {

        const breakpoints = [1920];

        //@ts-expect-error
        const photos: Photo[] = images.map(image => {
            return {
                src: image.thumbnailPath ? "/api/image/thumbnail/" + image._id : "/api/image/" + image._id,
                width: image.width,
                height: image.height,
                alt: image._id,
                key: image._id,
                label: image.description,
                title: image.description,
                srcSet: breakpoints.map((breakpoint) => ({
                    src: "/api/image/thumbnail/" + image._id,
                    width: breakpoint,
                    height: Math.round((Number(image.height) / Number(image.width)) * breakpoint),
                })),
            }
        });

        return photos;
    }

    return <div className="container mx-auto">
        {isLoading && <Loading />}

        <Lightbox>
            {imageStructure.map((item, i) => {
                const slides = mapImageToPhoto(item.images);

                return (
                    <div key={item.folderCode} className="!mt-10">
                        {createFolderTitle(item.folderName, item.folderCode, item.folderIsVisible)}

                        <hr className="border-t border-gray-300 my-4" />

                        <RowsPhotoAlbum
                            photos={slides}
                            render={{
                                image: (props: RenderImageProps) => <ImageWrapper title={props.title} src={props.src} />
                            }}
                            componentsProps={() => ({
                                image: { loading: "lazy" },
                            })}
                            targetRowHeight={300}
                            onClick={({ index: current }) => setIndex(current)}
                        />
                    </div>
                )
            })}
        </Lightbox>
    </div>;
};

export default ImageGallery;