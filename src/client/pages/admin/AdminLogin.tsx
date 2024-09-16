import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import { useAppStore } from '../../ZustandContext';

const AdminLogin = () => {
  const setToken = useAppStore(state => state.setToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const api = new Api();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.login(email, password);
      
      setToken(response.data.jwt);
      navigate('/admin/home');
    } catch (err) {
      console.error('Chyba při přihlašování', err);
      setError('Nesprávné přihlašovací údaje. Zkuste to prosím znovu.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen admin-login-page">
      <div className="w-[400px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Přihlášení</h2>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="vas@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Heslo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Přihlásit se
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-primary-500 hover:text-primary-800" href="#">
              Zapomněli jste heslo?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;