import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import ItemDetail from "./pages/ItemDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mylist" 
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/item/:id" 
          element={
            <ProtectedRoute>
              <ItemDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
