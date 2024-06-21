import React, {useState} from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './sidebar.jsx'
import { Outlet } from 'react-router-dom'

export default function Template() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let sidebarClass = ""
    if(sidebarOpen){sidebarClass = "sidebarOpen"} else {sidebarClass = ""}

    return (
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
