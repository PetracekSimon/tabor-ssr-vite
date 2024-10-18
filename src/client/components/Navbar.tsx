import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-main flex justify-between items-center p-4 bg-light-100 sticky top-0 z-50 backdrop-blur-md px-8">
      <div className="navbar-main__item navbar-main__item--logo text-xl font-bold">
        <a href="/">
          <img src="/logo.png" alt="logo" className="w-20 h-10" />
        </a>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <ul className={`menu flex-col ${isOpen ? "open" : "hidden"} md:flex-row md:flex gap-4`}>
        <li className="navbar-main__item text-xl font-bold">
          <NavLink onClick={toggleMenu} to="/">Aktuálně</NavLink>
        </li>
        <li className="navbar-main__item text-xl font-bold">
          <NavLink onClick={toggleMenu} to="/o-tabore">O táboře</NavLink>
        </li>
        <li className="navbar-main__item text-xl font-bold">
          <NavLink onClick={toggleMenu} to="/prubeh-tabora">Průběh tábora</NavLink>
        </li>
        <li className="navbar-main__item text-xl font-bold">
          <NavLink onClick={toggleMenu} to="/chci-jet">Chci jet</NavLink>
        </li>
        <li className="navbar-main__item group relative dropdown">
          <NavLink to="/galerie" className="text-xl font-bold">Galerie</NavLink>
          <div className="group-hover:block dropdown-menu absolute hidden h-auto right-0">
            <ul className="top-0 w-35 bg-light pt-4 text-right">
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2025">2025</NavLink>
              </li>
              {/* ostatní položky */}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
