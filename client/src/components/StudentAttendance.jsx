import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import "../css/Teacher.css";
import "../css/studentInformation.css";
import { CiSearch } from "react-icons/ci";
import "../css/studentInformation/all.min.css";
import axios from 'axios';
import { useAuth } from './context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import "../css/StudentAttendance.css"
import CustomFooter from './CustomFooter';
import Preloader from "./Preloader"
import { Tooltip } from '@mui/material';



export default function StudentAttendance() {

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [filteredRows, setFilteredRows] = useState([]);

    const { CSRFToken, user } = useAuth();

    if (user.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }

    const [Classes, SetClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [StudentInformation, SetStudentInformation] = useState(null);
    const [search, setSearch] = useState("")

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

    useEffect(()=>{
        if(!StudentInformation){
            setLoading(true)
        } else{
            setLoading(false)
        }
    }, [StudentInformation])

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
        { field: 'FatherName', headerName: 'Father Name', width: 140, },
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
      
      let [rows, setRows] = useState([])
      useEffect(()=>{
      if(StudentInformation && StudentInformation.length > 0){
          let mapped = StudentInformation.map((student, index) => ({
              id:student.id,
              ID: index + 1,
              StudentName: student.users.name,
              FatherName: student.parents.FatherName,
              age: student.StudentDOB,
              PhoneNumber: student.StudentPhoneNumber,
              JoiningDate: student.created_at.split("T")[0],
              HomeAddress: student.StudentHomeAddress
          }));
          setRows(mapped)
          setFilteredRows(mapped)
      }})
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const results = rows.filter(student =>
            student.StudentName.toLowerCase().includes(search.toLowerCase()) || 
            student.FatherName.toLowerCase().includes(search.toLowerCase()) ||
            student.PhoneNumber.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredRows(results);
    }, [search, rows]);

    return (
        <div className='studentAttendanceMainDiv'>
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
                        <Tooltip title="Search on this page" arrow>
                            <input type='text' className='searchInput' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search Student' ></input>
                        </Tooltip>
                        <Tooltip title="Search the Database" arrow>
                            <button type='button' onClick={GetStudentInformation}><CiSearch color='white' /></button>
                        </Tooltip>
                    </div>
                </div>
            </form>
    <div className='tableDiv attendacnceDiv'>
      <div style={{ height: 400, width: '100%' , display:"flex", flexDirection: "column"   }}>
      
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          loading={loading}
          initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          }
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(newSelection)=>{
            setSelectedRows(newSelection);
        }}
        slots={{
            footer: CustomFooter,
            loadingOverlay: Preloader
        }}
        />
      </div>
    </div>
    </div>
    );
}
