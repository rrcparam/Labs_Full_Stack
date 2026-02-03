import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
      <Link to="/employees">Employees</Link>
      <Link to="/organization">Organization</Link>
    </nav>
  );
};

export default Navbar;
