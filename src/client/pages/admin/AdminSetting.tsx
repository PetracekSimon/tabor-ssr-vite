import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore, UserRole } from "../../ZustandContext";
import { Api } from "../../api";
import AdminChangePasswordForm from "../../components/admin/AdminChangePasswordForm";
import AdminCreateUserForm from "../../components/admin/AdminCreateUserForm";
import AdminUsersTable from "../../components/admin/AdminUsersTable";

export type User = {
	_id: string;
	email: string;
	role: UserRole;
};

const AdminSettings = () => {
	const { token, setLoggedUser, loggedUser } = useAppStore();
	const navigate = useNavigate();

	const [users, setUsers] = useState<User[]>([]);

	const api = new Api();

	const handleLoadUsers = async () => {
		if (!loggedUser) {
			return;
		}
		if (loggedUser.role !== 'SuperAdmin') {
			return;
		}

		try {
			const response = await api.userList(token);
			setUsers(response.data.itemList);

		} catch (error) {
			console.error("Chyba při načítání uživatelů:", error);
		}
	}

	// Check token
	useEffect(() => {
		if (!token) {
			navigate('/admin');
			return;
		}

		api.checkToken(token)
			.then((res) => {
				setLoggedUser({
					email: res.data.email,
					role: res.data.role,
					verified: res.data.verified
				});
			})
			.catch((err) => {
				console.error("Chyba při ověření tokenu:", err);
				navigate('/admin');
			});

		handleLoadUsers();

	}, [token, navigate, setLoggedUser]);



	function handleUpdateUser(): void {
		throw new Error("Function not implemented.");
	}
	function handleDeleteUser(): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-semibold text-slate-800 dark:text-white mb-5">Nastavení</h1>
			<AdminChangePasswordForm />
			{loggedUser?.role === "SuperAdmin" && <AdminCreateUserForm createUserCallback={handleLoadUsers} />}
			{loggedUser?.role === "SuperAdmin" &&
				<AdminUsersTable onDelete={handleDeleteUser} onEdit={handleUpdateUser} users={users} />
			}
		</div>
	);
};

export default AdminSettings;