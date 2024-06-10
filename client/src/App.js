import React, { useEffect } from 'react'
import Login from './components/Login.jsx'
import "./App.css"
import { useAuth } from './components/context/AuthProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PublicRoute from './components/Auth/PublicRoute.jsx'
import Template from './components/Template.jsx'
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import ManageClasses from './components/ManageClasses.jsx';
import CreateClass from './components/CreateClass.jsx';
import CreateTeacher from './components/CreateTeacher.jsx';

export default function App() {
  const {result} = useAuth()
  
    useEffect(()=>{
      console.log(result);
  }, [result])
  
  
  

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <PublicRoute element={<Login />} />
    },
    {
      path: "/",
      element: <PrivateRoute element={<Template element={<CreateTeacher />} />} />
    }
])

  return (
    <div>
          <RouterProvider router={router} />
    </div>
  )
}
