import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Student System</div>

        <div className="links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/about">About</NavLink>

          {isAdmin && (
            <>
              <NavLink to="/students">Students</NavLink>
              <NavLink to="/random-user">Random User</NavLink>
            </>
          )}

          {!isAuthenticated && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="user-badge">
                {user?.username}
                <span className="user-role">{user?.role}</span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
