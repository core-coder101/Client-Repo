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


export default function Navbar({ setSidebarOpen, sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [selectedValue, setSelectedValue] = useState([
    {
      label: "Main Campus",
      value: "Main Campus",
    },
  ]);
  const closeBtnRef = useRef(null);

  const options = [
    {
      label: "Main Campus",
      value: "Main Campus",
    },
    {
      label: "Second Campus",
      value: "Second Campus",
    },
  ];

  return (
    <div className="Navbar">
      <div className="leftItems">
        <MdMenu color="white" style={{width: "30px", height: "30px", margin: "5px"}} className="menuSidebarBtn d-block d-sm-none" onClick={()=>{setSidebarOpen(prev=>!prev)}}/>
        <div className="Searchbar d-none d-sm-block">
          <input type="text" placeholder="Search Student" />
          <button>
            <IoSearch color="white" />
          </button>
        </div>
        <div className="campus">
          <FaHome color="white" style={{ marginRight: "5px" }} />
          <Select
            options={options}
            onChange={(values) => {
              setSelectedValue(values);
            }}
            values={selectedValue}
            style={{ outline: "none", border: "none", textDecoration: "none" }}
            searchable={false}
            className="dropDown"
          />
        </div>
      </div>
      <div className="rightItems">
        <div
          className="logout"
          onClick={() => {
            dispatch(logout())
            .unwrap()
            .then(()=>{
              navigate("/login")
            })
            .catch(() => {
              return
            })
          }}
        >
          <p>Logout</p>
          <IoExitOutline color="white" />
        </div>
      </div>
    </div>
  );
}
