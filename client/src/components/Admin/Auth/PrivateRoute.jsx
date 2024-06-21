import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/slices/authSlice";

export default function PrivateRoute() {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
