import { useState } from 'react';
import { toast } from "react-toastify";
import { Image } from "../../api"

interface UpdateImageModalContentProps {
  onConfirm: (description: string) => Promise<void>;
  onCancel: () => void;
  image: Image;
}

const UpdateImageModalContent = ({ onCancel, image, onConfirm }: UpdateImageModalContentProps) => {

  const [description, setDescription] = useState<string>(image.description);

  const handleUpdate = async () => {
    await toast.promise(onConfirm(description), {
      pending: "Ukládání",
      error: "Něco se pokazilo",
      success: "Uloženo"
    }).then(() => onCancel());
  }

  return (
    <div className="w-[400px]">

      <div className="mb-4 p-4">
        <label className="block text-slate-800 dark:text-white dark text-sm font-bold mb-2" htmlFor="imageDescription">
          Popis obrázku
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-900 dark:text-white dark:border-slate-600"
          id="imageDescription"
          type="text"
          placeholder="Zadejte popis obrázku"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete='off'
        />
      </div>

      <div className="flex justify-end gap-4 px-4 py-2 border-t">
        <button
          onClick={onCancel}
          type="button"
          className="text-gray-500 bg-transparent focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:focus:ring-gray-600"
        >
          Zrušit
        </button>
        <button
          onClick={handleUpdate}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
        >
          Uložit
        </button>
      </div>
    </div>
  );
};

export default UpdateImageModalContent;
