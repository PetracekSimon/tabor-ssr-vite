import { toast } from "react-toastify";
import { User } from "../../pages/admin/AdminSetting";

interface DeleteUserModalContentProps {
    onConfirm: () => Promise<void>;
    onCancel: () => void;
    user: User | null
}

const DeleteUserModalContent = ({ onConfirm, onCancel, user }: DeleteUserModalContentProps) => {

    const handleDeleteUser = async () => {
        if (!user) {
            return;
        }

        await toast.promise(onConfirm(), {
            pending: "Mazání uživatele",
            error: "Něco se pokazilo",
            success: "Uživatel byl úspěšně smazán"
        }).then(() => onCancel());
    }
    return (
        <>
            <div className="text-center p-4">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Opravdu chcete smazat tohto uživatele?
                </h3>
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
                    onClick={handleDeleteUser}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                    Smazat
                </button>
            </div>
        </>
    );
};

export default DeleteUserModalContent;
