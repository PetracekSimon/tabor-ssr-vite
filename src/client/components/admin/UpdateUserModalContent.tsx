import { useState } from 'react';
import { toast } from "react-toastify";
import { User } from '../../pages/admin/AdminSetting';
import { Api, ApiError } from "../../api";

interface UpdateUserModalContentProps {
    onConfirm: (userEmail: string, userRole: string, userPassword: string) => Promise<void>;
    onCancel: () => void;
    user: User;
}

const UpdateUserModalContent = (props: UpdateUserModalContentProps) => {
    const [userEmail, setUserEmail] = useState<string>(props.user.email);
    const [userRole, setUserRole] = useState<string>(props.user.role);
    const [userPassword, setUserPassword] = useState<string>("");

    const handleUpdate = async () => {
        await toast.promise(props.onConfirm(userEmail, userRole, userPassword), {
            pending: "Ukládání",
            success: "Uloženo",
            error: {
                render(response) {
                    const axiosError = response as { data: { response: { data: ApiError } } };
                    const error = axiosError.data.response.data;

                    return error?.errMessage?.cs || 'Něco se pokazilo 😢';
                }
            }
        }).then(() => props.onCancel());
    }

    return (
        <div className="w-[400px] p-4">


            <div className="flex flex-col space-y-2 mb-4">
                <label
                    htmlFor="newUserEmailInput"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    E-mail
                </label>
                <input
                    autoComplete="fake-newUserEmailInput"
                    aria-autocomplete="none"
                    type="email"
                    id="newUserEmailInput"
                    name="fake-newUserEmailInput"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col space-y-2 mb-4">
                <label
                    htmlFor="newUserRoleSelect"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Role
                </label>
                <select
                    id="newUserRoleSelect"
                    name="newUserRoleSelect"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setUserRole(e.target.value)}
                    value={userRole} // controlled komponent
                >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>

            </div>

            <div className="flex flex-col space-y-2 mb-4">
                <label
                    htmlFor="newUserPasswordInput"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Heslo
                </label>
                <input
                    autoComplete="fake-newUserPasswordInput"
                    aria-autocomplete="none"
                    type="password"
                    id="newUserPasswordInput"
                    name="fake-newUserPasswordInput"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
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

export default UpdateUserModalContent;
