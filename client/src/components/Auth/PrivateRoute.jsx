import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom';


export default function PrivateRoute({element}) {

  const  { user }= useAuth();
  const navigate = useNavigate()
  
  
  return (
    user ? element : <Navigate to="/login" />
  )
}