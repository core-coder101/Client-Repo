import React, { useState, useEffect , useRef } from 'react';
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
import { DataGrid } from '@mui/x-data-grid';



export default function StudentAttendance() {


    const navigate = useNavigate();
    
    const [isOpen, setIsOpen] = useState({});

    const { CSRFToken, user } = useAuth();

    if (user.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }

    const [Classes, SetClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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
      
      
      const columns = [
        { field: 'ID', headerName: 'Sr no.', width: 75 },
        { field: 'StudentName', headerName: 'Student Name', width: 140 },
        { field: 'FatherName', headerName: 'Father Name', width: 140 },
        {
          field: 'age',
          headerName: 'Student DOB',
          width: 120,
        },
        {
          field: 'PhoneNumber',
          headerName: 'Phone Number',
          width: 160,
        },
        {
          field: 'JoiningDate',
          headerName: 'Joining Date',
          width: 160,
        },
        {
          field: 'HomeAddress',
          headerName: 'Home Address',
          width: 250,
        },
      ];
    

    const rows = StudentInformation.map((student, index) => ({
        id:student.id,
        ID: index + 1,
        StudentName: student.users.name,
        FatherName: student.parents.FatherName,
        age: student.StudentDOB,
        PhoneNumber: student.StudentPhoneNumber,
        JoiningDate: student.created_at.split("T")[0],
        HomeAddress: student.StudentHomeAddress
    }));

    const [selectedRows, setSelectedRows] = useState([]);
    
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
  {Classes.data && Array.from(new Set(Classes.data.map(Class => Class.ClassRank))).map(rank => (
    <option key={rank} value={rank}>{rank}</option>
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(newSelection)=>{
            setSelectedRows(newSelection);
        }}
        />
      </div>
    </div>
    </div>
    );
}
