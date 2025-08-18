import { useEffect, useState } from "react";
import { useAppStore, UserRole } from "../../ZustandContext";
import { Api } from "../../api";
import AdminChangePasswordForm from "../../components/admin/AdminChangePasswordForm";
import AdminCreateUserForm from "../../components/admin/AdminCreateUserForm";
import AdminUsersTable from "../../components/admin/AdminUsersTable";
import Modal from "../../components/Modal";
import DeleteUserModalContent from "../../components/admin/DeleteUserModalContent";
import UpdateUserModalContent from "../../components/admin/UpdateUserModalContent";

export type User = {
	_id: string;
	email: string;
	role: UserRole;
};

const AdminSettings = () => {
	const { token, loggedUser } = useAppStore();

	const [users, setUsers] = useState<User[]>([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [handledUser, setHandledUser] = useState<User | null>(null);

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
		handleLoadUsers();
	}, [loggedUser]);



	function handleUpdateUser(userEmail: string, userRole: string, userPassword: string): Promise<any> {
		return api.updateUser(handledUser?._id || "", userEmail, userRole, userPassword, token).then(() => {
			handleLoadUsers();
		});
	}
	function handleDeleteUser(): Promise<any> {
		return api.deleteUser(handledUser?._id || "", token).then(() => {
			handleLoadUsers();
		});
	}

	const openDeleteModal = (user: User) => {
		setHandledUser(user);
		setDeleteModal(true);
	}
	const openUpdateModal = (user: User) => {
		setHandledUser(user);
		setUpdateModal(true);
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-semibold text-slate-800 dark:text-white mb-5">Nastavení</h1>
			<AdminChangePasswordForm />
			{loggedUser?.role === "SuperAdmin" && <AdminCreateUserForm createUserCallback={handleLoadUsers} />}
			{loggedUser?.role === "SuperAdmin" &&
				<AdminUsersTable onDelete={openDeleteModal} onEdit={openUpdateModal} users={users} />
			}

			<Modal
				isOpen={deleteModal}
				onClose={() => setDeleteModal(false)}
				title="Smazat uživatele"
			>
				<DeleteUserModalContent
					onConfirm={handleDeleteUser}
					user={handledUser}
					onCancel={() => setDeleteModal(false)}
				/>
			</Modal>
			<Modal
				isOpen={updateModal}
				onClose={() => setUpdateModal(false)}
				title="Upravit uživatele"
			>
				<UpdateUserModalContent
					onConfirm={handleUpdateUser}
					user={handledUser!}
					onCancel={() => setUpdateModal(false)}
				/>
			</Modal>
		</div>
	);
};

export default AdminSettings;