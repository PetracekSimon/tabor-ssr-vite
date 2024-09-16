import React, { useEffect } from "react";
import { Api } from "../../api";
import { useAppStore } from "../../ZustandContext";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Zde můžete přidat další obsah admin dashboardu */}
    </div>
  );
};

export default AdminHome;