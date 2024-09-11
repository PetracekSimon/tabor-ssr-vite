import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return <div className="flex justify-between items-center p-4 bg-white-100 mx-8 sticky top-0 z-50 backdrop-blur-md bg-white/30"  >
        <div className="text-xl font-bold">
            <a href="/">
                <img src="/logo.png" alt="logo" className="w-20 h-10" />
            </a>
        </div>
        <div className="flex justify-between items-center gap-4">
            <div className="text-xl font-bold">
                <Link to="/">Domů</Link>
            </div>
            <div className="text-xl font-bold">
                <Link to="/o-taboru">O táboře</Link>
            </div>
            <div className="text-xl font-bold">
                <Link to="/kontakt">Kontakt</Link>
            </div>
            <div className="text-xl font-bold">
                <Link to="/prihlaseni">Přihlášení</Link>
            </div>
        </div>
    </div>;
}