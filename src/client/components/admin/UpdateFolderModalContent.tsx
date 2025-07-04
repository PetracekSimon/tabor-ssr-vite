import { useState } from 'react';
import { toast } from "react-toastify";

interface UpdateFolderModalContentProps {
  onConfirm: (folderName: string, folderCode: string, folderOrder: number) => Promise<void>;
  onCancel: () => void;
  folderCode?: string;
  folderName?: string;
  folderOrder?: number;
}

const UpdateFolderModalContent = (props: UpdateFolderModalContentProps) => {
  const [folderName, setFolerName] = useState<string>(props.folderName!);
  const [folderOrder, setFolderOrder] = useState<number>(props.folderOrder!);

  const handleUpdate = async () => {
    await toast.promise(props.onConfirm(props.folderCode!, folderName, folderOrder), {
      pending: "Ukládání",
      error: "Něco se pokazilo",
      success: "Uloženo"
    }).then(() => props.onCancel());
  }

  return (
    <div className="w-[400px]">

      <div className="mb-4 p-4">
        <label className="block text-slate-800 dark:text-white dark text-sm font-bold mb-2" htmlFor="folderName">
          Název složky
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-900 dark:text-white dark:border-slate-600"
          id="folderName"
          type="text"
          placeholder="Zadejte nový název složky"
          value={folderName}
          onChange={(e) => setFolerName(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div className="mb-4 p-4">
        <label className="block text-slate-800 dark:text-white dark text-sm font-bold mb-2" htmlFor="folderName">
          Pořadí
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-900 dark:text-white dark:border-slate-600"
          id="folderOrder"
          type="number"
          placeholder="Zadejte nové pořadí složky"
          value={folderOrder}
          onChange={(e) => setFolderOrder(Number(e.target.value))}
          autoComplete='off'
        />
      </div>

      <div className="flex justify-end gap-4 px-4 py-2 border-t">
        <button
          onClick={props.onCancel}
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

export default UpdateFolderModalContent;
