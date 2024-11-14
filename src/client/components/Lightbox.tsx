import React, { useState, PropsWithChildren, useEffect } from 'react';
import './lightbox.css'; // Přidej styly pro lightbox

//TODO: tohle musíme opravit - nefunguje to
const Lightbox = (props: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState<any[]>([]);


    useEffect(() => {
        let data: any[] = [];

        const traverseChildren = (childNodes: React.ReactNode) => {
            React.Children.forEach(childNodes, (child) => {
                if (React.isValidElement(child)) {
                    if (!Object.prototype.hasOwnProperty.call(child.props, "photos")) {
                        traverseChildren(child.props.children)
                    } else {
                        data.push(...child.props.photos);
                    }
                }
            });
        };
        traverseChildren(props.children);

        setImages(data);

    }, [props.children])



    const handleImageClick = (index: number) => {
        setCurrentImage(index);
        setIsOpen(true);
    };


    useEffect(() => {
        console.log(images);


        if (images.length) {
            console.log("using effect");
            images.forEach((img, index) => {
                const imgEl = document.querySelector(`img[src="${img.src}"]`) as HTMLImageElement;
                imgEl?.addEventListener("click", () => {
                    console.log(imgEl.alt);
                    handleImageClick(index);
                })

            })
        }

    }, [images.length]);


    useEffect(()=>{
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
        
    }, [isOpen])


    const handleClose = (e: any) => {
        if (e.nativeEvent.srcElement instanceof HTMLImageElement || e.nativeEvent.srcElement instanceof HTMLButtonElement) { // při kliknutí na obrázek nechceme zavírat lightbox
           return; 
        }
        
        setIsOpen(false);
    };

    const handleNext = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="lightbox-container">
                {React.Children.map(props.children, (child) => {
                    return React.cloneElement(child as React.ReactElement);
                })}
            </div>

            {isOpen && (

                <div className="lightbox-overlay" onClick={(e: any) => handleClose(e)}>
                    <div className="lightbox-content">
                        <img
                            src={(images[currentImage].src)}
                            alt={`Obrázek ${currentImage + 1}`}
                        />
                        {/* TODO: */}
                        {images[currentImage].label && (<span>{images[currentImage].label}</span>)}
                        <button className="lightbox-prev" onClick={handlePrev}>❮</button>
                        <button className="lightbox-next" onClick={handleNext}>❯</button>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Lightbox;