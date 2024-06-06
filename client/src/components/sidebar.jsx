import React, { useEffect,useRef, useState } from 'react';
import '../css/Sidebar.css';

function Sidebar({setSidebarOpen}) {

    const [scrollbarVisibility, setScrollbarVisibility] = useState("scrollbarDisappear")


  
  const sidebarRef = useRef(null);
  const closeBtnRef = useRef(null);
  const searchBtnRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const closeBtn = closeBtnRef.current;
    const searchBtn = searchBtnRef.current;

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    };

    closeBtn.addEventListener("click", handleSidebarToggle);
    searchBtn.addEventListener("click", handleSidebarToggle);

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
      searchBtn.removeEventListener("click", handleSidebarToggle);
    };
  }, []);

  return (
    <>
      <div>
        <div className="sidebar" ref={sidebarRef}>
          <div className="logo-details">
            <i className="bx bxl-c-plus-plus icon" />
            <div className="logo_name">CodingLab</div>
            <i className="bx bx-menu" id="btn" ref={closeBtnRef} onClick={()=>{setSidebarOpen(prev => !prev)}} />
          </div>
          <ul className={"nav-list " + scrollbarVisibility} onMouseEnter={()=>{setScrollbarVisibility("")}} onMouseLeave={()=>{setScrollbarVisibility("scrollbarDisappear")}}>
            <li>
              <i className="bx bx-search" ref={searchBtnRef} />
              <input type="text" placeholder="Search..." />
              <span className="tooltip">Search</span>
            </li>
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
                <img src="profile.jpg" alt="profileImg" />
                <div className="name_job">
                  <div className="name">Prem Shahi</div>
                  <div className="job">Web designer</div>
                </div>
              </div>
              <i className="bx bx-log-out" id="log_out" />
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
