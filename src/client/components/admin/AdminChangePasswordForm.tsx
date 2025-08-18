import { FormEvent } from "react";
import { toast } from "react-toastify";
import { Api, ApiError } from "../../api";
import { useAppStore, UserRole } from "../../ZustandContext";


const AdminChangePasswordForm = () => {

  const api = new Api();
  const { token } = useAppStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const oldPw = formData.get('oldPasswordInput') as string;
    const newPw = formData.get('newPasswordInput') as UserRole;
    const newPwAgain = formData.get('newPasswordConfirmInput') as string;

    await toast.promise(
      api.updatePassword (oldPw, newPw, newPwAgain, token),
      {
        pending: 'Měním heslo...',
        success: 'Heslo bylo úspěšně změněno 🎉',
        error: {
          render(response) {
            const error = response.data.response.data as ApiError;
            console.log(error);
            
            return error?.errMessage?.cs || 'Něco se pokazilo 😢';
          }
        }

      }
    ).then(() => {
      form.reset();
    });

  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md space-y-6 mb-10" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
        Změnit heslo
      </h1>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="oldPasswordInput"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Zadejte staré heslo
        </label>
        <input
          type="password"
          id="oldPasswordInput"
          name="oldPasswordInput"
          className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="newPasswordInput"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Zadejte nové heslo
        </label>
        <input
          type="password"
          id="newPasswordInput"
          name="newPasswordInput"
          className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="newPasswordConfirmInput"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Zadejte nové heslo znovu
        </label>
        <input
          type="password"
          id="newPasswordConfirmInput"
          name="newPasswordConfirmInput"
          className="w-full rounded-lg border border-gray-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300"
      >
        Uložit
      </button>
    </form>
  );
};

export default AdminChangePasswordForm;
