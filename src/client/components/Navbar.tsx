import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
    return <div className="navbar-main flex justify-between items-center p-4 bg-light-100 sticky top-0 z-50 backdrop-blur-md px-8"  >
        <div className="navbar-main__item navbar-main__item--logo text-xl font-bold">
            <a href="/">
                <img src="/logo.png" alt="logo" className="w-20 h-10" />
            </a>
        </div>
        <ul className="flex justify-between items-center gap-4">
            <li className="navbar-main__item text-xl font-bold">
                <Link to="/">Aktuálně</Link>
            </li>
            <li className="navbar-main__item text-xl font-bold">
                <Link to="/o-taboru">O táboře</Link>
            </li>
            <li className="navbar-main__item text-xl font-bold">
                <Link to="/prubeh-tabora">Průběh tábora</Link>
            </li>
            <li className="navbar-main__item text-xl font-bold">
                <Link to="/chci-jet">Chci jet</Link>
            </li>
            <li className="navbar-main__item group relative dropdown">
                <Link to="/galerie" className="text-xl font-bold">Galerie</Link>
                <div className="group-hover:block dropdown-menu absolute hidden h-auto right-0">

                    <ul className="top-0 w-35 bg-light pt-4 text-right">
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2025">2025</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2024">2024</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2023">2023</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2022">2022</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2021">2021</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2020">2020</Link>
                        </li>
                        <li className="py-1 navbar-main__item navbar-main__item--child">
                            <Link className="px-4" to="/galerie/2019">2019</Link>
                        </li>
                    </ul>

                </div>
            </li>
        </ul>
    </div>
}