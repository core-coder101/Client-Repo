import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ roles }) {
  const { user } = useSelector((state) => state.auth);
  console.log("USER ROLE: ", user.Role);
  console.log(roles.includes(user.Role));
  console.log("roles: ", roles);

  if(!user){
    return <Navigate to="/login" />
  }

  if(roles.includes(user.Role)){
    return <Outlet />
  }

  // this function will run for all of the role based routes but it will be true for ONLY ONE!
  // and <Outlet /> will show the children of that one TRUE route
  // return roles.includes(user.Role) ? <Outlet /> : <Navigate to="/login" />;
}
