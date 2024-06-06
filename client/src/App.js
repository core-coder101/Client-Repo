import React, { useState } from 'react'
import Sidebar from './components/sidebar.jsx'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'
import "./App.css"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  let sidebarClass = ""
  if(sidebarOpen){sidebarClass = "sidebarOpen"} else {sidebarClass = ""}

  return (
    <div>
      <Sidebar setSidebarOpen={setSidebarOpen} />
      <div className={'main ' + sidebarClass}>
        <Navbar />
        <div className='contentArea'>
          <h1>.</h1>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}
