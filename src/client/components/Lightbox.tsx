import React, { useState, PropsWithChildren, useEffect } from 'react';
import './lightbox.css'; // Přidej styly pro lightbox

//TODO: tohle musíme opravit - nefunguje to
const Lightbox = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const findLightboxImages = (children: React.ReactNode): React.ReactElement[] => {
        const images: React.ReactElement[] = [];
    
        const traverseChildren = (childNodes: React.ReactNode) => {
            React.Children.forEach(childNodes, (child) => {
                if (React.isValidElement(child)) {                    
                    if (child.props.photos?.length) {
                        images.push(child.props.photos);
                        return;
                    }
                    // Rekurzivní volání pro prohledání vnořených dětí
                    if (child.props.children) {

                        traverseChildren(child.props.children);
                    }
                }
            });
        };
    
        traverseChildren(children);
        return images;
    };
    


    const [images, setImages] = useState(findLightboxImages(children));


    console.log(images)

    const handleImageClick = (index: number) => {
        setCurrentImage(index);        
        setIsOpen(true);
    };

    const handleClose = () => {
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
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child as React.ReactElement, {
                        onClick: () => handleImageClick(index),
                        style: { cursor: 'pointer', margin: '5px' }, // styl pro obrázky
                    });
                })}
            </div>

            {isOpen && (
                <div className="lightbox-overlay" onClick={handleClose}>
                    <div className="lightbox-content">
                        <img
                            src={(images[currentImage] as React.ReactElement).props.src}
                            alt={`Obrázek ${currentImage + 1}`}
                        />
                        <button className="lightbox-prev" onClick={handlePrev}>❮</button>
                        <button className="lightbox-next" onClick={handleNext}>❯</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lightbox;