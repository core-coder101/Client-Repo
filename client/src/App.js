import React, { useEffect } from 'react'
import "./App.css"
import { useAuth } from './components/context/AuthProvider';
import { RouterProvider } from 'react-router-dom'
import { router } from './components/Router.jsx';

export default function App() {
  const {result, CSRFToken, loading} = useAuth()
    useEffect(()=>{
      console.log(result);
  }, [result])

  return (
    <div>
          <RouterProvider router={router} />
    </div>
  )
}
