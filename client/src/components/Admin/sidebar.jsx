import React, { useState } from "react";
import "../../assets/css/Sidebar.css";
import { BsPersonFill } from "react-icons/bs";
import { TbHexagonLetterHFilled } from "react-icons/tb";
import SubMenu from "../common/SubMenu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { IoAddOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { GiTeacher } from "react-icons/gi";
import { IoMdCloudUpload } from "react-icons/io";
import { GoVideo } from "react-icons/go";


function Sidebar({ setSidebarOpen, sidebarOpen, sidebarRef, closeSidebarForMobile }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [scrollbarVisibility, setScrollbarVisibility] =
    useState("scrollbarDisappear");

  const classesData = {
    title: "Classes",
    icon: <SiGoogleclassroom />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: "Create Class",
        path: "/createclass",
        icon: <IoAddOutline style={{ width: "20px", height: "20px" }} />,
      },
      {
        title: "Manage Classes",
        path: "/manageclasses",
        icon: <SiGoogleclassroom />,
      },
    ],
  };
  const studentsData = {
    title: "Students",
    icon: <PiStudentFill />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: "Add Student",
        path: "/addstudent",
        icon: <IoAddOutline style={{ width: "20px", height: "20px" }} />,
      },
      {
        title: "Students Information",
        path: "/studentsinformation",
        icon: (
          <IoInformationCircleOutline
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        title: "Students Attendance",
        path: "/studentattendance",
        icon: (
          <IoIosCheckmarkCircleOutline
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ],
  };
  const teachersData = {
    title: "Teachers",
    icon: <FaChalkboardTeacher />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: "Add Teacher",
        path: "/addteacher",
        icon: <IoAddOutline style={{ width: "20px", height: "20px" }} />,
      },
      {
        title: "Teachers Information",
        path: "/teachersinformation",
        icon: (
          <IoInformationCircleOutline
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ],
  };
  const lecturesData = {
    title: "Lectures",
    icon: <GiTeacher />,
    iconClosed: <RiArrowDropDownLine />,
    iconOpened: <MdKeyboardArrowUp />,

    subNav: [
      {
        title: "Upload Lecture",
        path: "/uploadlecture",
        icon: <IoMdCloudUpload style={{ width: "20px", height: "20px" }} />,
      },
      {
        title: "Browse Lectures",
        path: "/selectvideo",
        icon: (
          <GoVideo
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ],
  };


  return (
    <>
      <div>
        <div className={"sidebar " + (sidebarOpen ? "open" : "")} ref={sidebarRef} style={sidebarOpen ? {left: "0"} : {}}>
          <div className="logo-details">
            <TbHexagonLetterHFilled
              color="white"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
              className={"" + (sidebarOpen ? "" : "w-0")}
            />
            <div className="logo_name" >{sidebarOpen ? "Hustlers" : ""}</div>
            <i
              className={"close-btn bx " + (sidebarOpen ? "bx-menu-alt-right" : "bx-menu")}
              id="btn"
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            />
          </div>
          <ul
            className={"nav-list " + scrollbarVisibility}
            onMouseEnter={() => {
              setScrollbarVisibility("");
            }}
            onMouseLeave={() => {
              setScrollbarVisibility("scrollbarDisappear");
            }}
          >
            <li>
              <Link onClick={closeSidebarForMobile} to="/">
                <i className="bx bx-grid-alt" />
                <span className="links_name">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <SubMenu closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} item={classesData} key={0} />
            <SubMenu closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} item={teachersData} key={1} />
            <SubMenu closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} item={studentsData} key={2} />
            <SubMenu closeSidebarForMobile={closeSidebarForMobile} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} item={lecturesData} key={3} />
            <li className={"profile " + (sidebarOpen ? "leftZero" : "")}>
              <div className="profile-details">
                <BsPersonFill
                  color="white"
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <div className="name_job">
                  <div className="name">{user ? user.Name : ""}</div>
                  <div className="job">{user ? user.Role : ""}</div>
                </div>
              </div>
              <i
                className="bx bx-log-out"
                id="log_out"
                onClick={() => {
                  dispatch(logout());
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
