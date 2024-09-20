import { useEffect, useState } from "react";
import { Api, ListResponse, Image } from "../api";
import { AxiosResponse } from "axios";

type ImageGalleryProps = {
    folder: string;
};

const ImageGallery = (props: ImageGalleryProps) => {

    const [images, setImages] = useState<Array<Image>>([]);

    
    useEffect(() => {
        const api = new Api();
        const filter = {
            filter: {
                folderCode: props.folder
            }
        };

        api.imageList(filter).then((res: AxiosResponse<ListResponse<Image>, any>) => {
            setImages(res.data.itemList);
        });
    }, [props.folder]);

    return <div className="image-gallery">
        {images.map((image) => (
            <div className="image-gallery__item" key={image._id}>
                <img src={"/api/image/" + image._id} alt={image.filename} />
                <span>{image.description}</span>
            </div>
        ))}
    </div>;
};

export default ImageGallery;