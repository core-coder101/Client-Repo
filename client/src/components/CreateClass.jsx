import React from 'react'
import "../css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";


export default function CreateClass(){
    return(
        <div className='createClass'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' /><h4>Dashboard \ Create a New Class</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='FormBorder ms-auto me-auto'>
        <div className='d-flex flex-column'>
        <label className='label'>Name of the Class</label>
        <input className='Forminput' placeholder='Enter name of Class' name='Name' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Rank of the Class</label>
        <input className='Forminput' type='number' placeholder='Enter Rank of Class' name='Rank' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Floor</label>
        <input className='Forminput' placeholder='Enter name of Floor' name='Floor' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Teacher</label>
        <select id="cars" className='Forminput' name="cars">
  <option value="volvo">Volvo XC90</option>
  <option value="saab">Saab 95</option>
  <option value="mercedes">Mercedes SLK</option>
  <option value="audi">Audi TT</option>
</select>
        </div>
        <div>
            <button className='btn btn-primary mt-3 w-100' type='button'>Submit</button>
        </div>
        </div>
        </div>
    );
}