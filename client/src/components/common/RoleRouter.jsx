import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.Role === "Admin") {
    return <Outlet />;
  }
  return;
}