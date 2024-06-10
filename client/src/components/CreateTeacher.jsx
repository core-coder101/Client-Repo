import React from 'react'
import "../css/Teacher.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";


export default function CreateTeacher(){
    return(
        <div className='createClass'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' /><h4>Dashboard \ Admit a new teacher</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='FormBorder ms-auto me-auto'>
        <div className='d-flex flex-column'>
        <input className='Forminput' placeholder='Enter name of Teacher' name='Name' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' placeholder='Enter UserName of Teacher' name='Name' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='number' placeholder='Enter Email of Teacher' name='Rank' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='date' placeholder='Enter DOB of Teacher' name='DOB' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='text' placeholder='Enter CNIC of Teacher' name='CNIC' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='text' placeholder='Enter Phone Number of Teacher' name='Phn_Num' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='text' placeholder='Enter Home Address of Teacher' name='HomeAddress' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Religion of Teacher</label>
        <select id="religions" className='Forminput' name="religions">
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Irreligion">Irreligion</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Buddhism">Buddhism</option>
        </select>
        </div>
        <div className='d-flex flex-column mt-3'>
        <input className='Forminput' type='number' placeholder='Enter Starting Salary of Teacher' name='Salary' required></input>
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