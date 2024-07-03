import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Select from "react-dropdown-select";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className="Navbar">
      <div className="leftItems">
        <div className="Searchbar">
          <input type="text" placeholder="Search Student" />
          <button>
            <IoSearch color="white" />
          </button>
        </div>
      </div>
      <div className="rightItems">
        <div
          className="logout"
          onClick={() => {
            dispatch(logout());
          }}
        >
          <p>Logout</p>
          <IoExitOutline color="white" />
        </div>
      </div>
    </div>
  );
}
