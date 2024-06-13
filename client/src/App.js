import React, { useEffect } from 'react'
import "./App.css"
import { useAuth } from './components/context/AuthProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { router } from "./components/Routes.jsx"

export default function App() {
  const {result} = useAuth()
  
    useEffect(()=>{
      console.log(result);
  }, [result])


  return (
    <div>
          <RouterProvider router={router} />
    </div>
  )
}
