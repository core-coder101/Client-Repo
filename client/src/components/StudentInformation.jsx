import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../css/Teacher.css"
import "../css/studentInformation.css"
import { CiSearch } from "react-icons/ci";


export default function StudentInformation() {

    const navigate = useNavigate()

  return (
    <div>
        <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'>
                <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                <h4>Dashboard \ Admit a new Student</h4>
            </div>
            <div className='ms-auto me-4'></div>
        </div>
        <form>
            <div className='inputsDiv'>
                <div className="inputDiv">
                    <p>Campus</p>
                    <select className='input' name='campus'>
                        <option value={"Main Campus"} >Main Campus</option>
                        <option value={"SecondCampus"} >SecondCampus</option>
                    </select>
                </div>
                <div className="inputDiv">
                    <p>Class</p>
                    <select className='input' name='class'>
                        <option value={1} >1</option>
                        <option value={2} >2</option>
                        <option value={3} >3</option>
                        <option value={4} >4</option>
                        <option value={5} >5</option>
                        <option value={6} >6</option>
                        <option value={7} >7</option>
                        <option value={8} >8</option>
                        <option value={9} >9</option>
                        <option value={10} >10</option>
                        <option value={2} >11</option>
                        <option value={2} >12</option>
                    </select>
                </div>
                <div className="inputDiv">
                    <p>Name</p>
                    <select className='input' name='name'>
                        <option value={"Green House"} >Green House</option>
                        <option value={"White House"} >White House</option>
                    </select>
                </div>
                <div className="filterDataDiv">
                    <p>Filter Data</p>
                    <button type='submit'><CiSearch color='white    ' /></button>
                </div>
            </div>
        </form>

    </div>
  )
}
