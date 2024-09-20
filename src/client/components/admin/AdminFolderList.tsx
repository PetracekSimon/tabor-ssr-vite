import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppStore } from "../../ZustandContext";
import { Api, Folder } from "../../api";


interface AdminFolderListProps {
    handleFolder: (isRoot: boolean, isBackFolder: boolean, slicedIndex: number, folder?: Folder) => void,
    selecteFolder: string,
    currentPath: Folder[]
    setCreateFolderModal: Dispatch<SetStateAction<boolean>>
    folders: Folder[],
    setFolders: Dispatch<SetStateAction<Folder[]>>;
}


const FolderIcon = () => (
    <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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


const HomeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    </svg>
);


const AdminFolderList = (props: AdminFolderListProps) => {
    const { token } = useAppStore();

    const api = new Api();

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await api.getFolderList({ filter: { parentFolderCode: props.selecteFolder } }, token);
                props.setFolders(response.data.itemList);
            } catch (error) {
                console.error("Chyba při načítání složek:", error);
            }
        };

        fetchFolders();
    }, [props.selecteFolder]);

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
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {props.folders.map((folder) => (
                    <li key={folder._id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => props.handleFolder(false, false, 0, { name: folder.name, code: folder.code, _id: folder._id })}>
                        <FolderIcon />
                        <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate w-full text-center">{folder.name}</span>
                    </li>
                ))}
                <li className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => props.setCreateFolderModal(true)}>
                    <FolderAddIcon />
                    <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white truncate w-full text-center">Nová složka</span>
                </li>
            </ul>

        </>
    )
}

export default AdminFolderList