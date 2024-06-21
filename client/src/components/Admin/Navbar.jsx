import React, { useState } from 'react'
import "../../assets/css/Navbar.css"
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Select from "react-dropdown-select";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';


export default function Navbar() {

  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = useState([{
    label: 'Main Campus',
    value: 'Main Campus',
    }])

  const options = [
    {
      label: 'Main Campus',
      value: 'Main Campus',
      },
      {
        label: 'Second Campus',
        value: 'Second Campus',
        }
        ];
        

        return (
          <div className='Navbar'>
      <div className='leftItems'>
        <div className="Searchbar">
          <input type='text' placeholder='Search Student' />
          <button><IoSearch color="white" /></button>
        </div>
        <div className='campus'>
          <FaHome color='white' style={{marginRight: "5px"}}/>
          <Select
            options={options}
            onChange={(values) => {
              setSelectedValue(values)
            }}
            values={selectedValue}
            style={{outline: "none", border: "none", textDecoration: "none", }} 
            searchable={false}           
            className='dropDown'
          />
        </div>
      </div>
      <div className='rightItems'>
            <div className='logout' onClick={()=>{dispatch(logout())}}>
              <p>Logout</p>
              <IoExitOutline color='white' />
            </div>
      </div>
    </div>
  )
}
