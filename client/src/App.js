import React, { useEffect, useState } from 'react'
import "./App.css"
import { Outlet, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { router } from './components/Admin/Router.jsx';
import { useSelector } from 'react-redux';
import Sidebar from './components/Admin/sidebar.jsx';
import Navbar from './components/Admin/Navbar.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import Login from './components/Admin/Login.jsx';
import Template from './components/Admin/Template.jsx';
import PublicRoute from './components/Auth/PublicRoute.jsx';

export default function App() {
  const { result } = useSelector((state) => state.auth)
    useEffect(()=>{
      console.log(result);
  }, [result])

  function Layout(){

    const [sidebarOpen, setSidebarOpen] = useState(false)
    let sidebarClass = ""
    if(sidebarOpen){sidebarClass = "sidebarOpen"} else {sidebarClass = ""}

    return(
      <div>
          <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className={'main ' + sidebarClass}>
              <Navbar />
              <div className='contentArea'>
                  <Outlet />
              </div>
          </div>
      </div>
    )
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route index path="/" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
        </Routes>
      </Router>
    </div>
  )
}
