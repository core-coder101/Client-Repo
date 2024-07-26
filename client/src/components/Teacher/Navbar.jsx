import React, { useRef, useState } from "react";
import "../../assets/css/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Select from "react-dropdown-select";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";


export default function Navbar({ setSidebarOpen, sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <div className={"Navbar " + (sidebarOpen ? "SidebarOpen" : "")}>
      <div className="leftItems">
        <MdMenu color="white" style={{width: "30px", height: "30px", margin: "5px"}} className="menuSidebarBtn d-block d-sm-none" onClick={()=>{setSidebarOpen(prev=>!prev)}}/>
        <div className="Searchbar d-none d-sm-block">
          <Tooltip title="Search from your class">
            <input type="text" placeholder="Search Student" />
          </Tooltip>
          <button>
            <IoSearch color="white" />
          </button>
        </div>
      </div>
      <div className="rightItems">
        <div
          className="logout"
          onClick={() => {
            dispatch(logout())
            navigate("/login")
          }}
        >
          <p>Logout</p>
          <IoExitOutline color="white" />
        </div>
      </div>
    </div>
  );
}
