import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../css/Teacher.css";
import "../css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../css/studentInformation/all.min.css";
import { IoPersonCircle } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import axios from 'axios';
import { useAuth } from './context/AuthProvider';
import defaultImg from "../img/default.png"

export default function StudentInformation() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { CSRFToken, user } = useAuth();

    if (user.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }

    const [Classes, SetClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [SuccessMessage, setSuccessMessage] = useState('');

    const [ApiSearchData, SetApiSearchData] = useState({
        campus: "Main Campus",
        ClassRank: "",
        ClassName: ""
    });

    const GetClasses = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/GetClasses', {
                    headers: {
                        'X-CSRF-TOKEN': CSRFToken,
                        'Content-Type': 'application/json',
                        'API-TOKEN': 'IT is to secret you cannot break it :)',
                    },
                }
            );
            SetClasses(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage({ success: false, message: "Failed to Load Classes" });
        }
    }

    const [StudentInformation, SetStudentInformation] = useState([]);
    const GetStudentInformation = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/GetStudentInformation', {
                    campus: ApiSearchData.campus,
                    ClassRank: ApiSearchData.ClassRank,
                    ClassName: ApiSearchData.ClassName
                }, {
                    headers: {
                        'X-CSRF-TOKEN': CSRFToken,
                        'Content-Type': 'application/json',
                        'API-TOKEN': 'IT is to secret you cannot break it :)',
                    },
                }
            );
            SetStudentInformation(response.data.data || []);
        } catch (error) {
            console.error(error);
            setErrorMessage({ success: false, message: "Failed to Get Student Info" });
        }
    }

    useEffect(() => {
        GetClasses();
    }, []);

    useEffect(() => {
        if (ApiSearchData.ClassRank && ApiSearchData.ClassName) {
            GetStudentInformation();
        }
    }, [ApiSearchData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetApiSearchData(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage("");
        setSuccessMessage("");
    };

    return (
        <div>
            <div className='headingNavbar d-flex justify-content-center'>
                <div className='d-flex'>
                    <FaRegArrowAltCircleLeft onClick={() => { navigate("/") }} className='arrow' />
                    <h4>Dashboard \ Admit a new Student</h4>
                </div>
                <div className='ms-auto me-4'></div>
            </div>
            <form>
                <div className='inputsDiv'>
                    <div className="inputDiv">
                        <p>Campus</p>
                        <select className='input' name='campus' onChange={handleChange}>
                            <option value="Main Campus">Main Campus</option>
                            <option value="Second Campus">Second Campus</option>
                        </select>
                    </div>
                    <div className="inputDiv">
                        <p>Class</p>
                        <select className='input' name='ClassRank' onChange={handleChange}>
                            {Classes.data && Classes.data.map(Class => (
                                <option key={Class.id} value={Class.ClassRank}>{Class.ClassRank}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inputDiv">
                        <p>Name</p>
                        <select className='input' name='ClassName' value={ApiSearchData.ClassName} onChange={handleChange}>
                        <option></option>
                            {Classes.data && Classes.data.map((Class, index) => (
                                ApiSearchData.ClassRank == Class.ClassRank && (
                                    <option key={Class.id} value={Class.ClassName}>{Class.ClassName}</option>
                                )
                            ))}
                        </select>
                    </div>
                    <div className="filterDataDiv">
                        <p>Filter Data</p>
                        <button type='button' onClick={GetStudentInformation}><CiSearch color='white' /></button>
                    </div>
                </div>
            </form>
            <div className='tableDiv'>
                <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
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
                            {StudentInformation && StudentInformation.length > 0 ? StudentInformation.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>
                                        <div style={{width: "40px", height: "40px"}} className="profile-container ms-auto me-auto mb-3">
                                            <img src={student.image ? student.image : defaultImg} alt="Profile Icon" className="profile-icon" />
                                        </div>
                                    </td>
                                    <td>{student.users.name}</td>
                                    <td>{student.parents.FatherName}</td>
                                    <td>{ApiSearchData.ClassRank}</td>
                                    <td>{ApiSearchData.ClassName}</td>
                                    <td>{ApiSearchData.campus}</td>
                                    <td>{student.parents.GuardiansPhoneNumber}</td>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div style={{width: "40px", height: "40px"}} className="profile-container ms-auto me-auto mb-3">
                                            <img src={student.image ? student.image : defaultImg} alt="Profile Icon" className="profile-icon" />
                                        </div>
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.parentName}</td>
                                    <td>{student.classRank}</td>
                                    <td>{student.className}</td>
                                    <td>{student.campus}</td>
                                    <td>{student.parentPhone}</td>
                                    <td>
                                        <div className="filterDataDiv generateID innerButtonDiv">
                                            <p>Generate ID</p>
                                            <button><TiDocumentText color='white' style={{ width: "18px", height: "18px" }} /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="filterDataDiv resetPassword innerButtonDiv">
                                            <p>Reset Password</p>
                                            <button><FaKey color='white' style={{ width: "18px", height: "18px" }} /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="filterDataDiv viewProfile innerButtonDiv">
                                            <p>View Profile</p>
                                            <button><IoPerson color='white' style={{ width: "18px", height: "18px" }} /></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="dropdown-toggle customButton"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded={isOpen}
                                                onClick={() => { setIsOpen(prev => !prev) }}
                                            >
                                                Actions
                                            </button>
                                            <div className={`customDropDown dropdown-menu${isOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Edit</a>
                                                <a className="dropdown-item" href="#">Delete</a>
                                                <a className="dropdown-item" href="#">Deactivate Student</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="12" className="text-center">No Student Information Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
