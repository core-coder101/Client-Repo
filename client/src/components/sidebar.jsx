import React, { useEffect,useRef, useState } from 'react';
import '../css/Sidebar.css';
import { BsPersonFill } from "react-icons/bs";
import { useAuth } from './context/AuthProvider';
import { TbHexagonLetterHFilled } from "react-icons/tb";
import SubMenu from './SubMenu';
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import { SiGoogleclassroom } from "react-icons/si";
import { IoAddOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


function Sidebar({setSidebarOpen, sidebarOpen}) {

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


  const classesData = {
    title: 'Classes',
    path: '',
    icon: <SiGoogleclassroom />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: 'Manage Classes',
        path: '/manageclasses',
        icon: <SiGoogleclassroom />
      },
      {
        title: 'Create Class',
        path: '/createclass',
        icon: <IoAddOutline style={{width: "20px", height: "20px"}} />
      }
    ]
  }
  const studentsData = {
    title: 'Students',
    path: '',
    icon: <PiStudentFill />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: 'Add Student',
        path: '/addstudent',
        icon: <IoAddOutline style={{width: "20px", height: "20px"}} />
      },{
        title: 'Students Information',
        path: '/studentsinformation',
        icon: <IoInformationCircleOutline style={{width: "20px", height: "20px"}} />
      },
      {
        title: 'Students Attendance',
        path: '/studentattendance',
        icon: <IoIosCheckmarkCircleOutline style={{width: "20px", height: "20px"}} />
      },
    ]
  }
  const teachersData = {
    title: 'Teachers',
    path: '',
    icon: <FaChalkboardTeacher />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: 'Add Teacher',
        path: '/addteacher',
        icon: <IoAddOutline style={{width: "20px", height: "20px"}} />
      },{
        title: 'Teachers Information',
        path: '/teachersinformation',
        icon: <IoInformationCircleOutline style={{width: "20px", height: "20px"}} />
      },
    ]
  }

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
              <Link to="/">
                <i className="bx bx-grid-alt" />
                <span className="links_name">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <SubMenu sidebarOpen={sidebarOpen} item={classesData} key={0} />
            <SubMenu sidebarOpen={sidebarOpen} item={teachersData} key={1} />
            <SubMenu sidebarOpen={sidebarOpen} item={studentsData} key={2} />
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
