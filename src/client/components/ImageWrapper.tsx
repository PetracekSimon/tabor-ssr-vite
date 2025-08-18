import { RenderImageProps } from "react-photo-album/*";
import "./image-wrapper.css"

interface ImageWrapperProps extends RenderImageProps { }

const ImageWrapper = (props: ImageWrapperProps) => {

    return <div className="custom-image-wrapper">
        <img loading="lazy" src={props.src} alt={props.title} title={props.title} className="lightbox-image" />
        {props.title && (
            <div className="text-xs text-left image-title">
                {props.title}
            </div>
        )}
    </div>
}

export default ImageWrapper;