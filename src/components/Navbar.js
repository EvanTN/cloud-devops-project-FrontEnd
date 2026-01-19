import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#282c34", color: "white" }}>
      {token ? (
        <>
          <Link to="/" style={{ marginRight: "1rem", color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "1rem", color: "white", textDecoration: "none" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
