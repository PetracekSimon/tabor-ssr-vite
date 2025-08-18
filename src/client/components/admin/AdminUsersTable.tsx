import React from "react";
import { User } from "../../pages/admin/AdminSetting";
import { useAppStore } from "../../ZustandContext";



interface UsersTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {

    const isMe = (user: User) => {
        const loggedUser = useAppStore.getState().loggedUser;
        return loggedUser && user.email === loggedUser.email;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700">
                            E-mail
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700">
                            Role
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700">
                            Akce
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <tr
                            key={user._id}
                            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-300 dark:border-slate-700"
                        >
                            <td className="px-4 py-3 text-slate-800 dark:text-slate-100">
                                {user.email}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                                {user.role}
                            </td>
                            <td className="px-4 py-3">
                                {isMe(user) ? "" : <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(user)}
                                        className="inline-flex items-center gap-2 rounded-lg bg-slate-700 text-white px-3 py-1.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900"
                                    >
                                        {/* Pencil */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 20h9" />
                                            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                        <span className="hidden sm:inline">Upravit</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(user)}
                                        className="inline-flex items-center gap-2 rounded-lg bg-red-500 text-white px-3 py-1.5 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-offset-slate-900"
                                    >
                                        {/* Trash */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6" />
                                            <path d="M14 11v6" />
                                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                                        </svg>
                                        <span className="hidden sm:inline">Smazat</span>
                                    </button>
                                </div>}

                            </td>
                        </tr>
                    ))}

                    {users.length === 0 && (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                            >
                                Žádní uživatelé k zobrazení.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
