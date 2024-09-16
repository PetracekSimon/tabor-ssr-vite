import React, { useState, useEffect } from "react"
import { Api, Image } from "../../api";
import { useAppStore } from "../../ZustandContext";
import { useNavigate } from "react-router-dom";
import AdminImageUploader from "../../components/admin/AdminImageUploader";
import AdminImageList from "../../components/admin/AdminImageList";
import DeleteImageModalContent from "../../components/admin/DeleteImageModalContent";
import UpdateImageModalContent from "../../components/admin/UpdateImageModalContent";
import Modal from "../../components/Modal";

interface Folders {
  itemList: {
    _id: string;
    name: string;
    code: string;
  }[]
}

const FolderIcon = () => (
  <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
  </svg>
);

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

const AdminGallery = () => {
  const navigate = useNavigate();
  const { token, setLoggedUser } = useAppStore();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [folders, setFolders] = useState<Folders>({ itemList: [] });
  const [selectedFolder, setSelectedFolder] = useState<string>("root");
  const [handledImage, setHandledImage] = useState<Image>();
  const api = new Api();
  const [currentPath, setCurrentPath] = useState<{ name: string, code: string }[]>([]);

  // Check token
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    api.checkToken(token)
      .then((res) => {
        console.log(res);
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

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await api.getFolderList({}, token);
        setFolders(response.data);
      } catch (error) {
        console.error("Chyba při načítání složek:", error);
      }
    };

    fetchFolders();
  }, []);


  const handleUpload = async (files: File[]) => {
    await api.uploadImages(files, selectedFolder, token);
  };

  function handleDelete(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Správa galerie</h1>

      <AdminImageUploader onUpload={handleUpload} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Složky</h2>
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600" onClick={() => setCurrentPath([])}>
                <HomeIcon />
                <span className="ml-1 md:ml-2">Hlavní</span>
              </a>
            </li>
            {currentPath.map((folder, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2" onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}>
                    {folder.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.itemList.map((folder) => (
            <li key={folder._id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setCurrentPath([...currentPath, { name: folder.name, code: folder.code }])}>
              <FolderIcon />
              <span className="mt-2 text-sm font-medium text-gray-900 truncate w-full text-center">{folder.name}</span>
            </li>
          ))}
        </ul>
        <AdminImageList folderCode={selectedFolder} onDelete={setDeleteModal} onUpdate={setUpdateModal} setHandledImage={setHandledImage} />
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Smazat obrázek"
      >
        <DeleteImageModalContent
          itemName="obrázek"
          onConfirm={handleDelete}
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
            image={handledImage!}
          />
        </Modal>
    </div>
  );
};

export default AdminGallery;