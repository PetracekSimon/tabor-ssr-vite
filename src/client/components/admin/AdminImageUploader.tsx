import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from "react-toastify";

interface FileWithPreview extends File {
    preview: string;
}

interface ImageUploaderProps {
    onUpload: (files: File[]) => Promise<void>;
}

const AdminImageUploader = ({ onUpload }: ImageUploaderProps) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isDraggingGlobal, setIsDraggingGlobal] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        ]);        
        setIsDraggingGlobal(false); // schovej overlay po dropu
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
        multiple: true
    });

    const removeFile = (file: FileWithPreview) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file));
    };

    const handleUpload = async () => {
        setIsUploading(true);
        await toast.promise(onUpload(files), {
            pending: "Nahrávání obrázků",
            error: "Něco se pokazilo",
            success: "Obrázky byly nahrány"
        }).then(() => {
            setFiles([]);
        }).finally(() => setIsUploading(false));
    };

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsDraggingGlobal(true);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDraggingGlobal(false);

            if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                const acceptedFiles = Array.from(e.dataTransfer.files);

                setFiles(prevFiles => [
                    ...prevFiles,
                    ...acceptedFiles.map(file =>
                        Object.assign(file, { preview: URL.createObjectURL(file) })
                    )
                ]);

                e.dataTransfer.clearData(); // prevent "ghost image" dragging
            }
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            setIsDraggingGlobal(false);
        };

        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);
        window.addEventListener("dragleave", handleDragLeave);

        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
            window.removeEventListener("dragleave", handleDragLeave);
        };
    }, []);

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="relative">
            {/* Fullscreen overlay při globálním drag */}
            {isDraggingGlobal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center text-white text-2xl pointer-events-none">
                    Dropni obrázky kdekoliv na stránce 📸
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-slate-800">
                Nahrát nové obrázky
            </h2>

            {/* Dropzone pole zůstává */}
            <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-300 hover:border-primary-500 relative z-10"
            >
                <input {...getInputProps()} />
                <p className='dark:text-white text-slate-800'>
                    Přetáhněte sem obrázky nebo klikněte pro výběr souborů
                </p>
            </div>

            {files.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                        Vybrané soubory:
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className="bg-gray-100 dark:bg-transparent p-4 rounded flex flex-col items-center border"
                            >
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-full h-32 object-cover mb-2 rounded"
                                />
                                <span className="text-sm truncate w-full text-center text-slate-800 dark:text-white">
                                    {file.name}
                                </span>
                                <button
                                    onClick={() => removeFile(file)}
                                    className="mt-2 text-red-500 hover:text-red-700"
                                >
                                    Odstranit
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleUpload}
                        className="mt-6 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors disabled:bg-primary-300"
                        disabled={isUploading}
                    >
                        {isUploading ? "Nahrávání..." : "Nahrát obrázky"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminImageUploader;
