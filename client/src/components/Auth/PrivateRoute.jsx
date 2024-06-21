import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../features/auth/authSlice';



export default function PrivateRoute() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { user } = useSelector((state)=>state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
}