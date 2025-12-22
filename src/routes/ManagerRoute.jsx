// src/routes/ManagerRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Login from "../pages/Auth/login/Login";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role } = useRole();

  if (loading) {
    return <Login></Login>; 
  }

  if (user && role === "manager") {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ManagerRoute;
