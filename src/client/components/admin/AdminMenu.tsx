import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../ZustandContext";

const AdminMenu = () => {
    const { loggedUser, logout, setTheme, theme } = useAppStore();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMenuOpen(false);
            } else {
                setIsMenuOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <div className="absolute md:relative">
            <nav className={`w-[300px] h-screen relative top-0 left-0 shadow-md flex flex-col transition-all duration-100 z-50 bg-white dark:bg-slate-900 border-r dark:border-white border-slate-600
                            ${isMenuOpen ? 'translate-x-0' : '-translate-x-[300px]'}
                            sticky md:translate-x-0`}>
                <div className="h-[150px] flex items-center justify-center border-b border-slate-600 dark:border-white">
                    <h1 className="text-2xl font-bold text-center text-slate-600 dark:text-white">Letní stanový tábor Kammená</h1>
                </div>

                <div className="flex items-center justify-between py-4 px-6 border-b border-slate-600 dark:border-white">
                    <Link to="/admin/settings" className="text-lg text-slate-600 dark:text-white">
                        {loggedUser ? loggedUser.email : 'Uživatel'}
                    </Link>


                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="text-slate-600 dark:text-white hover:text-yellow-500 transition-colors mx-4"
                        title="Přepnout dark mode"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1M12 20v1M4.22 4.22l.71.71M18.36 18.36l.71.71M1 12h1M22 12h1M4.22 19.78l.71-.71M18.36 5.64l.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    </button>


                    <button
                        onClick={handleLogout}
                        className="text-slate-600 dark:text-white hover:text-red-500 transition-colors"
                        title="Odhlásit se"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>


                <ul className="flex-grow">
                    <li className="group">
                        {/* //TODO: zjisti jak to udělat bez těch breakpointů - dark:hover */}
                        <Link to="/admin/home" className="block py-4 px-6 text-lg text-slate-600 dark:text-white dark:sm:hover:bg-slate-900 hover:bg-white transition-backgrounds duration-300">
                            Domů
                        </Link>
                    </li>
                    <li className="group">
                        <Link to="/admin/galerie" className="block py-4 px-6 text-lg text-slate-600 dark:text-white dark:sm:hover:bg-slate-900 hover:bg-white hover:bg-white transition-backgrounds duration-300">
                            Galerie
                        </Link>
                    </li>
                </ul>

                <button
                    onClick={toggleMenu}
                    className="absolute top-4 -right-10 bg-gray-100 p-2 rounded-r-md shadow-md md:hidden"
                >
                    {isMenuOpen ? '◀' : '▶'}
                </button>
            </nav>
        </div>
    );
};

export default AdminMenu;