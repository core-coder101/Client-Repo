import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../css/Teacher.css";
import "../css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../css/studentInformation/all.min.css";
import { FaKey } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import axios from 'axios';
import { useAuth } from './context/AuthProvider';
import defaultImg from "../img/default.png"

export default function StudentInformation() {
    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState({});

const toggleDropdown = (id) => {
  setIsOpen(prevState => ({
    ...prevState,
    [id]: !prevState[id]
  }));
};

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

    const [TeacherInformation, SetTeacherInformation] = useState([]);

    const GetTeacherInformation = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/GetTeacherInformation', {
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
            SetTeacherInformation(response.data.data || []);
        } catch (error) {
            console.error(error);
            setErrorMessage({ success: false, message: "Failed to Get Student Info" });
        }
    }

    useEffect(() => {
        GetClasses();
    }, []);

    useEffect(() => {
            GetTeacherInformation();
    }, [ApiSearchData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetApiSearchData(prev => ({
          ...prev,
          [name]: value,
        }));
        if (name === 'ClassRank') {
          // Update ClassName based on the selected ClassRank
          const selectedClass = Classes.data.find(Class => Class.ClassRank === value);
          if (selectedClass) {
            SetApiSearchData(prev => ({
              ...prev,
              ClassName: selectedClass.ClassName,
            }));
          }
        }
        setErrorMessage("");
        setSuccessMessage("");
      };
      


      const Delete = async(id) => {
        try {
          const response = await axios.post(
              'http://127.0.0.1:8000/api/DeleteStudent',{ID:id}
              ,{
                  headers: {
                      'X-CSRF-TOKEN': CSRFToken,
                      'Content-Type': 'application/json',
                      'API-TOKEN': 'IT is to secret you cannot break it :)',
                  },
              }
          );
          
      } catch (error) {
          console.error(error);
          setErrorMessage({ success: false, message: "Failed to Delete Student" });
      }
      }
    
      const Edit = (id) => {
        navigate(`/CreateStudent/${id}`);
      };


    return (
        <div>
            <div className='headingNavbar d-flex justify-content-center'>
                <div className='d-flex'>
                    <FaRegArrowAltCircleLeft onClick={() => { navigate("/") }} className='arrow' />
                    <h4>Dashboard \ Teacher Information</h4>
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
                        <option></option>
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
                        <button type='button' onClick={GetTeacherInformation}><CiSearch color='white' /></button>
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
                                <th>Phone Number</th>
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
                            {TeacherInformation && TeacherInformation.length > 0 ? TeacherInformation.map((teacher, index) => (
                                <tr key={teacher.id}>
                                    <td>{teacher.id}</td>
                                    <td>
                                        <div style={{width: "40px", height: "40px"}} className="profile-container ms-auto me-auto mb-3">
                                            <img src={teacher.users.images[0] ? `data:image/png;base64,${teacher.users.images[0].data}` : defaultImg} alt="Profile Icon" className="profile-icon" />
                                        </div>
                                    </td>
                                    <td>{teacher.users.name}</td>
                                    <td>{teacher.TeacherPhoneNumber}</td>
                                    <td>{teacher.classes.length > 0 ? 
                                        teacher.classes.map((Class)=>{
                                        return ( 
                                            <>
                                        {Class.ClassRank} <br /> 
                                        </>
                                        ) 
                                    }) : "" }
                                    </td>
                                    <td>
                                    {teacher.classes.length > 0 ? 
                                        teacher.classes.map((Class)=>{
                                        return ( 
                                            <>
                                        {Class.ClassName} <br /> 
                                        </>
                                        ) 
                                    }) : "" }
                                    </td>
                                    <td>{ApiSearchData.campus}</td>
                                    <td>{teacher.TeacherSalary}</td>
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
              className="DeleteBtn dropdown-toggle customButton"
              type="button"
              id={`dropdownMenuButton-${teacher.id}`} // Unique ID for each dropdown
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isOpen[teacher.id]}
              onClick={() => toggleDropdown(teacher.id)} // Pass the student ID to toggleDropdown
            >
              Actions
            </button>
            <div className={` customDropDown dropdown-menu${isOpen[teacher.id] ? ' show' : ''}`} style={{right:"0"}} aria-labelledby={`dropdownMenuButton-${teacher.id}`}>
              <a className="dropdown-item" onClick={()=>{Edit(teacher.id)}}>Edit</a>
              <a className="dropdown-item" onClick={()=>{Delete(teacher.id)}}>Delete</a>
              <a className="dropdown-item" onClick={()=>{}}>Deactivate Student</a>
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
