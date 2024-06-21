import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setUser } from '../../features/auth/authSlice';



export default function PublicRoute() {

  const dispatch = useDispatch()

  const { user } = useSelector((state)=>state.auth)

  console.log(!!user);

  return (
    user ? <Navigate to="/login" /> : <Outlet />
  )
}