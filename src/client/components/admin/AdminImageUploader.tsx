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

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        multiple: true
    });

    const removeFile = (file: FileWithPreview) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file));
    };

    const handleUpload = async () => {
        await toast.promise(onUpload(files), {
            pending: "Nahrávání obrázků",
            error: "Něco se pokazilo",
            success: "Obrázky byly nahrány"
        }).then((res) => {
            console.log(res);
            setFiles([]);
        });
    };

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-slate-800">Nahrát nové obrázky</h2>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary-500' : 'border-gray-300 hover:border-primary-500'}`}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-primary-500">Přetáhněte soubory sem...</p>
                ) : (
                    <p className='dark:text-white text-slate-800'>Přetáhněte sem obrázky nebo klikněte pro výběr souborů</p>
                )}
            </div>

            {files.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Vybrané soubory:</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <li key={index} className="bg-gray-100 dark:bg-transparent p-4 rounded flex flex-col items-center border">
                                <img src={file.preview} alt={file.name} className="w-full h-32 object-cover mb-2 rounded" />
                                <span className="text-sm truncate w-full text-center text-slate-800 dark:text-white">{file.name}</span>
                                <button onClick={() => removeFile(file)} className="mt-2 text-red-500 hover:text-red-700">
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