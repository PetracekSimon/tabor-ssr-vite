import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Api, Image } from "../../api"
import { useAppStore } from '../../ZustandContext';

interface UpdateImageModalContentProps {
  onCancel: () => void;
  image: Image;
}

const UpdateImageModalContent: React.FC<UpdateImageModalContentProps> = ({ onCancel, image }) => {

  const [description, setDescription] = useState<string>(image.description);
  const token = useAppStore(state => state.token);
  const api = new Api();

  const handleUpdate = async () => {
    await toast.promise(api.updateImageDescription(description, image._id, token), {
      pending: "Ukládání",
      error: "Něco se pokazilo",
      success: "Uloženo"
    }).then(() => onCancel());
  }

  return (
    <div className="w-[400px]">

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageDescription">
          Popis obrázku
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageDescription"
          type="text"
          placeholder="Popis obrázku"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleUpdate}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        >
          Uložit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Ne, zrušit
        </button>
      </div>
    </div>
  );
};

export default UpdateImageModalContent;
