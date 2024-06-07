import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom';


export default function PublicRoute({element}) {

  const { user }= useAuth();
  console.log(user);
  const navigate = useNavigate()
  return (
    user ? <Navigate to="/" /> : element
  )
}
