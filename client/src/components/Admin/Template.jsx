import React, {useState} from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './sidebar.jsx'

export default function Template({ element }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let sidebarClass = ""
    if(sidebarOpen){sidebarClass = "sidebarOpen"} else {sidebarClass = ""}

    return (
        <div>
            <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className={'main ' + sidebarClass}>
                <Navbar />
                <div className='contentArea'>
                    {element}
                </div>
            </div>
        </div>
  )
}
