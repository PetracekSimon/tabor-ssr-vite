import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Api, Folder } from "../../api";
import Modal from "../Modal";
import UpdateFolderModalContent from "./UpdateFolderModalContent";
import { useAppStore } from "../../ZustandContext";
import { toast } from "react-toastify";



interface AdminFolderListProps {
    handleFolder: (isRoot: boolean, isBackFolder: boolean, slicedIndex: number, folder?: Folder) => void,
    selectedFolder: Folder,
    currentPath: Folder[]
    setCreateFolderModal: Dispatch<SetStateAction<boolean>>
    folders: Folder[],
    setFolders: Dispatch<SetStateAction<Folder[]>>;

    setVisibilityCallback: () => void;
}


const FolderIcon = ({ isVisible }: { isVisible: boolean }) => (
    <svg className={`w-12 h-12 ${isVisible ? "text-primary-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
    </svg>
);

const FolderAddIcon = () => (
    <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
        <circle cx="17" cy="17" r="4.5" stroke="#22c55e" fill="none" strokeWidth="1"></circle>
        <line x1="17" y1="15" x2="17" y2="19" stroke="#22c55e" strokeWidth="1"></line>
        <line x1="15" y1="17" x2="19" y2="17" stroke="#22c55e" strokeWidth="1"></line>
    </svg>
);

const EyeIcon = ({ isVisible }: { isVisible: boolean }) => (
    <svg className={`w-8 h-8 ${isVisible ? "text-primary-500" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3C5.58 3 2.27 6.16 1 10c1.27 3.84 4.58 7 9 7s7.73-3.16 9-7c-1.27-3.84-4.58-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"></path>
        <path d="M10 7a3 3 0 100 6 3 3 0 000-6z"></path>
    </svg>
)


const HomeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
);


const AdminFolderList = (props: AdminFolderListProps) => {
    const api = new Api();

    const [showFolderUpdateModal, setShowFolderUpdateModal] = useState(false);
    const [handledFolder, setHandledFolder] = useState<Folder>();
    const { token } = useAppStore();

    const handleUpdateFolder = async (code: string, name: string, order: number): Promise<void> => {
        if (!handledFolder) {
            throw new Error("Není definován handledImage");
        }

        await api.updateFolder(code, name, order, token);
    }

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await api.getFolderList({ filter: { parentFolderCode: props.selectedFolder.code } }, token);
                props.setFolders(response.data.itemList);
            } catch (error) {
                console.error("Chyba při načítání složek:", error);
            }
        };

        fetchFolders();
    }, [props.selectedFolder]);

    const openUpdateFolderModal = (folder: Folder) => {
        setShowFolderUpdateModal(true);
        setHandledFolder(folder);

    }

    const handleCurrentFolderVisiblity = async () => {
        await toast.promise(
            api.setFolderVisibility(props.selectedFolder.code, !props.selectedFolder.isVisible, token),
            {
                pending: "Ukládání",
                error: "Něco se pokazilo",
                success: "Viditelnost byla změněna"
            }
        ).then(() => {
            props.setVisibilityCallback()
        });
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-2 dark:text-white text-slate-800">Složky</h2>
            <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600" onClick={() => props.handleFolder(true, false, 0)}>
                            <HomeIcon />
                            <span className="ml-1 md:ml-2">Hlavní</span>
                        </a>
                    </li>
                    {props.currentPath.map((folder, index) => (
                        <li key={index}>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <a href="#" className="ml-1 text-sm font-medium text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600 md:ml-2" onClick={() => props.handleFolder(false, true, index + 1, folder)}>
                                    {folder.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            {props.selectedFolder.code !== "root" && (
                <div className="flex mb-4">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white text-slate-800">Viditelnost aktuální složky:&nbsp;</h3>
                    <button onClick={handleCurrentFolderVisiblity}>
                        <EyeIcon isVisible={props.selectedFolder.isVisible} />
                    </button>
                </div>
            )}

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {props.folders.map((folder) => (
                    <li key={folder._id} className="relative" >
                        <button
                            onClick={() => openUpdateFolderModal(folder)}
                            className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 absolute top-2 right-2"
                            title="Upravit"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => props.handleFolder(false, false, 0, folder)}>
                            <FolderIcon isVisible={folder.isVisible} />
                            <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate w-full text-center">{folder.name}</span>
                        </div>
                    </li>
                ))}
                <li className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => props.setCreateFolderModal(true)}>
                    <FolderAddIcon />
                    <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate w-full text-center">Nová složka</span>
                </li>
            </ul >


            <Modal
                isOpen={showFolderUpdateModal}
                onClose={() => setShowFolderUpdateModal(false)}
                title="Upravit název složky"
            >
                <UpdateFolderModalContent
                    folderOrder={handledFolder?.order}
                    folderName={handledFolder?.name}
                    folderCode={handledFolder?.code}
                    onConfirm={handleUpdateFolder}
                    onCancel={() => setShowFolderUpdateModal(false)}
                />
            </Modal>
        </>
    )
}

export default AdminFolderList