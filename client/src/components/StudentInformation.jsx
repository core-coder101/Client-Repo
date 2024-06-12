import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../css/Teacher.css"
import "../css/studentInformation.css"
import { CiSearch } from "react-icons/ci";
import "../css/studentInformation/all.min.css"
import { IoPersonCircle } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";


export default function StudentInformation() {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

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
        <div className='tableDiv'>
            <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                    <th>Roll no.</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Parent Name</th>
                    <th>Class</th>
                    <th>Class Name</th>
                    <th>Campus</th>
                    <th>Parent Phone</th>
                    <th>ID Card</th>
                    <th>Reset Password</th>
                    <th>Profile</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><IoPersonCircle style={{width: "40px", height: "40px"}} /></td>
                        <td>Mohsin Jawad</td>
                        <td>Jawad Saleem</td>
                        <td>11</td>
                        <td>P6</td>
                        <td>Commerce</td>
                        <td>03033050736</td>
                        <td>
                            <div className="filterDataDiv generateID innerButtonDiv">
                                <p>Generate ID</p>
                                <button ><TiDocumentText color='white' style={{width: "18px", height: "18px"}} /></button>
                            </div>
                        </td>
                        <td>
                            <div className="filterDataDiv resetPassword innerButtonDiv">
                                <p>Reset Password</p>
                                <button><FaKey color='white' style={{width: "18px", height: "18px"}} /></button>
                            </div>
                        </td>
                        <td>
                            <div className="filterDataDiv viewProfile innerButtonDiv">
                                <p>View Profile</p>
                                <button><IoPerson color='white' style={{width: "18px", height: "18px"}} /></button>
                            </div>
                        </td>
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle customButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup= "true"
                                    aria-expanded={isOpen}
                                    onClick={()=>{setIsOpen(prev => !prev)}}
                                >
                                    Actions
                                </button>
                                <div className={`customDropDown dropdown-menu${isOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">
                                    Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                    Delete
                                    </a>
                                    <a className="dropdown-item" href="#">
                                    Deactivate Student
                                    </a>
                                </div>
                            </div>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
