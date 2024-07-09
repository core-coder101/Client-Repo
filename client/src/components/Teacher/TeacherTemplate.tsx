import React, {useEffect, useRef, useState} from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './sidebar.jsx'
import { Outlet } from 'react-router-dom'

export default function AdminTemplate() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let sidebarClass = ""
    if(sidebarOpen){sidebarClass = "sidebarOpen"} else {sidebarClass = ""}

    const sidebarRef = useRef(null)

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            event.stopPropagation();
            closeSidebarForMobile()
        }
      };
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
       
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
      const closeSidebarForMobile = ()=>{
        const mediaQuery = window.matchMedia('(max-width: 576px)')
        if(mediaQuery.matches){
            setSidebarOpen(false)
        }
      }

    return (
        <div>
        {sidebarOpen && <div className="overlay d-block d-sm-none" onClick={()=>{setSidebarOpen(prev=>!prev)}} />}
            <Sidebar closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} sidebarRef={sidebarRef} />
            <div className={'main ' + sidebarClass}>
                <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
                <div className={'contentArea ' + (sidebarOpen ? "SidebarOpen" : "")}>
                    <Outlet />
                </div>
            </div>
        </div>
  )
}
