import React from 'react'
import "../css/Navbar.css"
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";



export default function Navbar() {
  return (
    <div className='Navbar'>
      <div className='leftItems'>
        <div className="Searchbar">
          <input type='text' placeholder='Search Student' />
          <button><IoSearch color="white" /></button>
        </div>
        <div className='campus'>
        <FaHome color='white' />
          <p>Main Campus</p>
        </div>
      </div>
    </div>
  )
}
