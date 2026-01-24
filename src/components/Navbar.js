import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../api/auth";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">
          MyApp
        </Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
