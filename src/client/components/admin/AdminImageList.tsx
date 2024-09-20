import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppStore } from '../../ZustandContext';
import { Api, Image } from '../../api';

interface ImageListProps {
  folderCode: string;
  onDelete: Dispatch<SetStateAction<boolean>>;
  onUpdate: Dispatch<SetStateAction<boolean>>;
  setHandledImage: Dispatch<SetStateAction<Image | undefined>>;
  images: Image[],
  setImages: Dispatch<SetStateAction<Image[]>>;
}

const AdminImageList = ({ folderCode, onDelete, onUpdate, setHandledImage, setImages, images }: ImageListProps) => {
  const { loading, error, setLoading, setError } = useAppStore();


  const api = new Api();
  useEffect(() => {
    setImages([]);

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.imageList({ filter: { folderCode } });
        setImages(response.data.itemList);
      } catch (err) {
        console.error('Chyba při načítání obrázků:', err);
        setError('Nepodařilo se načíst obrázky. Zkuste to prosím znovu.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderCode]);

  const onEdit = (image: Image) => {
    setHandledImage(image)
    onUpdate(true);
  };

  const handleDelete = (image: Image) => {
    console.log('Smazat obrázek:', image);
    onDelete(true);
  };

  if (loading) {
    return <div>Načítání obrázků...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {images.map((image) => (
        <div key={image._id} className="relative border rounded-lg p-4 group">
          <img
            src={`/api/image/${image._id}`}
            alt={image.description || image.filename}
            className="w-full h-48 object-cover mb-2"
          />
          <p className="text-sm text-gray-600">{image.description || 'Bez popisu'}</p>

          {/* Ikony pro úpravu a smazání */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(image)}
              className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              title="Upravit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => handleDelete(image)}
              className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              title="Smazat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminImageList;
