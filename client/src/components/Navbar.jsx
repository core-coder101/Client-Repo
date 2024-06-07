import React, { useState } from 'react'
import "../css/Navbar.css"
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import Select from "react-dropdown-select";



export default function Navbar() {

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

      </div>
    </div>
  )
}
