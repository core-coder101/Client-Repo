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
import Dashboard from './components/Dashboard.jsx';
import CreateStudent from './components/CreateStudent.jsx';
import StudentInformation from './components/StudentInformation.jsx';
import PopupExample from './components/popup.jsx';

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
      element: <PrivateRoute element={<Template element={<Dashboard />} />} />
    },
    {
      path: "/addteacher",
      element: <PrivateRoute element={<Template element={<CreateTeacher />} />} />
    },
    {
      path: "/createclass",
      element: <PrivateRoute element={<Template element={<CreateClass />} />} />
    },
    {
      path: "/createclass/:ID",
      element: <PrivateRoute element={<Template element={<CreateClass />} />} />
    },
    {
      path: "/manageclasses",
      element: <PrivateRoute element={<Template element={<ManageClasses />} />} />
    },
    {
      path: "/addstudent",
      element: <PrivateRoute element={<Template element={<CreateStudent />} />} />
    },
    {
      path: "/studentinformation",
      element: <PrivateRoute element={<Template element={<StudentInformation />} />} />
    },
    {
      path: "/CreateStudent/:ID",
      element: <PrivateRoute element={<Template element={<CreateStudent />} />} />
    }
    ,
    {
      path: "/popup",
      element: <PopupExample />
    }
    

])

  return (
    <div>
          <RouterProvider router={router} />
    </div>
  )
}
