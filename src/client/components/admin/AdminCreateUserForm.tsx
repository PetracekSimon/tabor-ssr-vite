import { FormEvent } from "react";
import { toast } from "react-toastify";
import { Api, ApiError } from "../../api";
import { useAppStore, UserRole } from "../../ZustandContext";

interface AdminCreateUserFormProps {
    createUserCallback: () => void;
}

const AdminCreateUserForm = (props: AdminCreateUserFormProps) => {


    const api = new Api();
    const { token } = useAppStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('fake-newUserEmailInput') as string;
        const role = formData.get('newUserRoleSelect') as UserRole;
        const password = formData.get('fake-newUserPasswordInput') as string;

        await toast.promise(
            api.createUser(email, password, role, token),
            {
                pending: 'Vytvářím uživatele...',
                success: 'Uživatel vytvořen 🎉',
                error: {
                    render(response) {
                        const axiosError = response as { data: { response: { data: ApiError } } };
                        const error = axiosError.data.response.data;

                        return error?.errMessage?.cs || 'Něco se pokazilo 😢';
                    }
                }
            }
        ).then(() => {
            form.reset();
            props.createUserCallback();
        });

    };


    return (
        <form className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md space-y-6 mb-10" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                Vytvořit nového uživatele
            </h1>

            <div className="flex flex-col space-y-2">
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
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label
                    htmlFor="newUserRoleSelect"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Role
                </label>
                <select
                    id="newUserRoleSelect"
                    name="newUserRoleSelect"
                    defaultValue="Admin"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
            </div>

            <div className="flex flex-col space-y-2">
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
                />
            </div>


            <button
                type="submit"
                className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300"
            >
                Vytvořit
            </button>
        </form>
    );
};

export default AdminCreateUserForm;
