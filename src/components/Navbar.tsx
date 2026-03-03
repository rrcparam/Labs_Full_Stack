import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Pixell River</h2>

      <div className="links">
        <NavLink to="/employees" className={({ isActive }) => (isActive ? "active" : "")}>
          Employees
        </NavLink>

        <NavLink to="/organization" className={({ isActive }) => (isActive ? "active" : "")}>
          Organization
        </NavLink>
      </div>
    </nav>
  );
}