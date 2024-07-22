import React, { useState } from "react";
import "../../assets/css/Sidebar.css";
import { TbHexagonLetterHFilled } from "react-icons/tb";
import defaultImg from "../../assets/img/default.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { GoVideo } from "react-icons/go";


function Sidebar({ setSidebarOpen, sidebarOpen, sidebarRef, closeSidebarForMobile }) {
  const { user , userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [scrollbarVisibility, setScrollbarVisibility] =
    useState("scrollbarDisappear");

  const imageSrc = userData && userData.images && userData.images[0] && userData.images[0].data
  ? `data:image/png;base64,${userData.images[0].data}`
  : defaultImg;

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
            <li>
              <Link onClick={closeSidebarForMobile} to="/selectvideo">
                <i className="bx" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <GoVideo
                  style={{ width: "20px", height: "20px" }}
                />
                </i>
                <span className="links_name">Browse Lectures</span>
              </Link>
              <span className="tooltip">Browse Lectures</span>
            </li>
            <li className={"profile " + (sidebarOpen ? "leftZero" : "")}>
              <div className="profile-details">
              <img 
              style={{ borderRadius: '50%', objectFit: 'cover', height: '40px', width: '40px' }}
              src={imageSrc}
              alt="User Profile"
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
                  dispatch(logout())
                  navigate("/login")
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
