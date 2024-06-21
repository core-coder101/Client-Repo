import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUser } from "../../../redux/slices/authSlice";

export default function PublicRoute() {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate to="/" /> : <Outlet />;
}
