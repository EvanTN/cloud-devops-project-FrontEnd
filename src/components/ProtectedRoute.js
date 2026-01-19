import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  
  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, show the page
  return children;
};

export default ProtectedRoute;
