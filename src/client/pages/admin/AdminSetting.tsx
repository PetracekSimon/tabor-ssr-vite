import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../ZustandContext";
import { Api } from "../../api";

const AdminSettings = () => {
	const { token, setLoggedUser } = useAppStore();
	const navigate = useNavigate();
	const api = new Api();

	// Check token
	useEffect(() => {
		if (!token) {
			navigate('/admin');
			return;
		}

		api.checkToken(token)
			.then((res) => {
				console.log(res);
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
	}, [token, navigate, setLoggedUser]);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Nastavení administrace</h1>
			{/* Zde můžete přidat formuláře a další prvky pro nastavení */}
		</div>
	);
};

export default AdminSettings;