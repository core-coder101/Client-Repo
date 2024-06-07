import React, { useEffect,useRef, useState } from 'react';
import '../css/Sidebar.css';
import { BsPersonFill } from "react-icons/bs";
import { useAuth } from './context/AuthProvider';
import { TbHexagonLetterHFilled } from "react-icons/tb";


function Sidebar({setSidebarOpen}) {

  const { user, logout } = useAuth()


    const [scrollbarVisibility, setScrollbarVisibility] = useState("scrollbarDisappear")


  
  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const closeBtn = closeBtnRef.current;

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    };

    closeBtn.addEventListener("click", handleSidebarToggle);

    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }

    // Cleanup event listeners on component unmount
    return () => {
      closeBtn.removeEventListener("click", handleSidebarToggle);
    };
  }, []);

  return (
    <>
      <div>
        <div className="sidebar" ref={sidebarRef}>
          <div className="logo-details">
            <TbHexagonLetterHFilled color='white' style={{width: "30px", height: "30px", marginRight:"10px"}} />
            <div className="logo_name">Hustlers</div>
            <i className="bx bx-menu" id="btn" ref={closeBtnRef} onClick={()=>{setSidebarOpen(prev => !prev)}} />
          </div>
          <ul className={"nav-list " + scrollbarVisibility} onMouseEnter={()=>{setScrollbarVisibility("")}} onMouseLeave={()=>{setScrollbarVisibility("scrollbarDisappear")}}>
            <li>
              <a href="#">
                <i className="bx bx-grid-alt" />
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-user" />
                <span className="links_name">User</span>
              </a>
              <span className="tooltip">User</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-chat" />
                <span className="links_name">Messages</span>
              </a>
              <span className="tooltip">Messages</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-pie-chart-alt-2" />
                <span className="links_name">Analytics</span>
              </a>
              <span className="tooltip">Analytics</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-folder" />
                <span className="links_name">File Manager</span>
              </a>
              <span className="tooltip">Files</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-cart-alt" />
                <span className="links_name">Order</span>
              </a>
              <span className="tooltip">Order</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-heart" />
                <span className="links_name">Saved</span>
              </a>
              <span className="tooltip">Saved</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-cog" />
                <span className="links_name">Setting</span>
              </a>
              <span className="tooltip">Setting</span>
            </li>

            <li className="profile">
              <div className="profile-details">
                <BsPersonFill color='white' style={{width: "30px", height: "30px", marginRight: "10px"}} />
                <div className="name_job">
                  <div className="name">{user.Name}</div>
                  <div className="job">{user.Role}</div>
                </div>
              </div>
              <i className="bx bx-log-out" id="log_out" onClick={()=>{logout()}} />
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
