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
      <div className="navbar-main__item navbar-main__item--logo text-3xl font-bold">
        <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/">
          LST
        </NavLink>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <ul className={`menu flex-col ${isOpen ? "open" : "hidden"} md:flex-row md:flex gap-4`}>
        <li className="navbar-main__item text-xl ">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/prihlaska">
            Přihláška
          </NavLink>
        </li>
        <li className="navbar-main__item text-xl ">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/">
            Aktuálně
          </NavLink>
        </li>
        <li className="navbar-main__item text-xl ">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/o-tabore">
            O táboře
          </NavLink>
        </li>
        <li className="navbar-main__item text-xl ">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/prubeh-tabora">
            Průběh tábora
          </NavLink>
        </li>
        <li className="navbar-main__item text-xl ">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)} to="/chci-jet">
            Chci jet
          </NavLink>
        </li>
        <li className="navbar-main__item group relative dropdown">
          <NavLink onClick={() => setIsOpen(false)} to="/galerie" className="text-xl ">Galerie</NavLink>
          <div className="group-hover:block dropdown-menu absolute hidden h-auto right-0">
            <ul className="top-0 w-35 bg-light pt-4 text-right">
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active px-4" : "px-4"} to="/galerie/2025">2025</NavLink>
              </li>
              {/* 
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2024">2024</NavLink>
              </li>
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2023">2023</NavLink>
              </li>
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2022">2022</NavLink>
              </li>
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2021">2021</NavLink>
              </li>
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2020">2020</NavLink>
              </li>
              <li className="py-1 navbar-main__item navbar-main__item--child">
                <NavLink className="px-4" to="/galerie/2019">2019</NavLink>
              </li>
              */}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
