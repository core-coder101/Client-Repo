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
import Popup from "react-animated-popup"
import Preloader from './Preloader';



export default function StudentInformation() {

    const [visible, setVisible] = useState(false)

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
    const [popup, setPopup] = useState(false)
    useEffect(()=>{
        if(errorMessage){
        setPopup(true)
        } else {
        setPopup(false)
        }
    }, [errorMessage])

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
            SetApiSearchData(prev => {
                return {...prev,
                    ClassRank: response.data.data[0].ClassRank,
                    ClassName: response.data.data[0].ClassName
                }
            })
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to Load Classes")
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
            setErrorMessage("Failed to Get Student Info")
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

          if(response.data.success == true){
            setErrorMessage(response.data.message)
            SetStudentInformation((prev)=>{
                return prev.filter((student) => {
                    return !(student.id === id)
                })
            })
          } else{
            setErrorMessage(response.data.message)
          }

      } catch (error) {
          console.error(error);
          setErrorMessage("Failed to Delete Student")
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
                    <h4>Dashboard \ Students Information</h4>
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
                                            <img src={student.users.images[0] ? `data:image/png;base64,${student.users.images[0].data}` : defaultImg} alt="Profile Icon" className="profile-icon" />
                                        </div>
                                    </td>
                                    <td>{student.users.name}</td>
                                    <td>{student.parents.FatherName}</td>
                                    <td>{ApiSearchData.ClassRank}</td>
                                    <td>{ApiSearchData.ClassName}</td>
                                    <td>{ApiSearchData.campus}</td>
                                    <td>{student.parents.GuardiansPhoneNumber}</td>
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
                                            id={`dropdownMenuButton-${student.id}`}
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded={isOpen[student.id]}
                                            onClick={() => toggleDropdown(student.id)}
                                        >

                                        Actions
                                        
                                        </button>
                                        <div className={` customDropDown dropdown-menu${isOpen[student.id] ? ' show' : ''}`} style={{right:"0"}} aria-labelledby={`dropdownMenuButton-${student.id}`}>
                                            <a className="dropdown-item" onClick={()=>{Edit(student.users.id)}}>Edit</a>
                                            <a className="dropdown-item" onClick={()=>{Delete(student.id)}}>Delete</a>
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
                            <Popup visible={popup} onClose={() => {setPopup(false); setTimeout(()=>{setErrorMessage("")},400)}}  style={{backgroundColor: "#11101de9", boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px"}}>
                                <div className='d-flex justify-content-center align-items-center' style={{width: "max-content", height: "100%", padding: "0"}}>
                                    <h5 style={{color: "white", margin: "0"}}>{errorMessage}</h5>
                                </div>
                            </Popup>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
