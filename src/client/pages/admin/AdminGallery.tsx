import { useState, useEffect } from "react"
import { Api, Folder, Image } from "../../api";
import { useAppStore } from "../../ZustandContext";
import { useNavigate } from "react-router-dom";
import AdminImageUploader from "../../components/admin/AdminImageUploader";
import AdminImageList from "../../components/admin/AdminImageList";
import DeleteImageModalContent from "../../components/admin/DeleteImageModalContent";
import UpdateImageModalContent from "../../components/admin/UpdateImageModalContent";
import Modal from "../../components/Modal";
import AdminFolderList from "../../components/admin/AdminFolderList";
import CreateFolderModalContent from "../../components/admin/CreateFolderModalContent";

const ROOT_FOLDER: Folder = {code: "root", name: "Galerie", _id: "root", order: 0, isVisible: true};

const AdminGallery = () => {
  const api = new Api();

  const navigate = useNavigate();
  const { token, setLoggedUser } = useAppStore();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [createFolderModal, setCreateFolderModal] = useState<boolean>(false);

  const [selectedFolder, setSelectedFolder] = useState<Folder>(ROOT_FOLDER);
  const [handledImage, setHandledImage] = useState<Image>();
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentPath, setCurrentPath] = useState<Folder[]>([]);


  // Check token
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    api.checkToken(token)
      .then((res) => {
        setLoggedUser({
          email: res.data.email,
          role: res.data.role,
          verified: res.data.verified
        });
      })
      .catch((err) => {
        console.error("Chyba při ověření tokenu:", err);
        navigate('/admin');
      });
  }, [token, navigate, setLoggedUser]);



  const handleUpload = async (files: File[]): Promise<void> => {
    const uploadedImages = await api.uploadImages(files, selectedFolder.code, token);
    setImages([...images, ...uploadedImages.data]);

  };

  const handleDelete = async (imageToRemove: Image): Promise<void> => {
    await api.deleteImage(imageToRemove._id, token);

    setImages(images.filter(image => image._id !== imageToRemove._id));
  }

  const handleCreateFolder = async (newFolderName: string, newFolderOrder: number): Promise<void> => {
    const createdFolder = await api.createFolder(newFolderName, newFolderOrder, selectedFolder.code, token);
    setFolders([...folders, createdFolder.data])
  }

  const handleUpdateImage = async (description: string): Promise<void> => {
    if (!handledImage) {
      throw new Error("Není definován handledImage");
    }

    const updatedImage = await api.updateImageDescription(description, handledImage._id, token);
    setImages(images.map(image => image._id === updatedImage.data._id ? updatedImage.data : image));
  }

  const handleSelectedFolder = (isRoot: boolean, isBackFolder: boolean, slicedIndex: number, folder?: Folder): void => {
    if (isRoot) {
      setSelectedFolder(ROOT_FOLDER);
      setCurrentPath([]);
      return
    }

    if (!folder) {
      return;
    }


    // Vracím se o složku víš (cd ..)
    if (isBackFolder) {
      setSelectedFolder(folder);
      setCurrentPath(currentPath.slice(0, slicedIndex));
      return;
    }

    // Vstupuju do složky (cd folder.code)
    setSelectedFolder(folder);
    setCurrentPath([...currentPath, folder])

  }

  const handleChangeFolderVisibility = () =>{
    setSelectedFolder({...selectedFolder, isVisible: !selectedFolder.isVisible });
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-slate-800">Správa galerie</h1>

      <AdminImageUploader
        onUpload={handleUpload}
      />

      <div className="mt-8">
        <AdminFolderList
          folders={folders}
          setFolders={setFolders}
          handleFolder={handleSelectedFolder}
          selectedFolder={selectedFolder}
          currentPath={currentPath}
          setCreateFolderModal={setCreateFolderModal}
          setVisibilityCallback={handleChangeFolderVisibility}
        />

        <AdminImageList
          images={images}
          setImages={setImages}
          folderCode={selectedFolder.code}
          onDelete={setDeleteModal}
          onUpdate={setUpdateModal}
          setHandledImage={setHandledImage}
        />
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Smazat obrázek"
      >
        <DeleteImageModalContent
          onConfirm={handleDelete}
          image={handledImage}
          onCancel={() => setDeleteModal(false)}
        />
      </Modal>

      <Modal
        isOpen={updateModal}
        onClose={() => setUpdateModal(false)}
        title="Upravit popis obrázku"
      >
        <UpdateImageModalContent
          onCancel={() => setUpdateModal(false)}
          onConfirm={handleUpdateImage}
          image={handledImage!}
        />
      </Modal>

      <Modal
        isOpen={createFolderModal}
        onClose={() => setCreateFolderModal(false)}
        title="Vytvořit novou složku">
        <CreateFolderModalContent
          onCancel={() => setCreateFolderModal(false)}
          onConfirm={handleCreateFolder}
        />
      </Modal>
    </div>
  );
};

export default AdminGallery;