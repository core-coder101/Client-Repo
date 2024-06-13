import React, { useState, useEffect, useRef } from 'react';
import "../css/Teacher.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../img/default.png"
import { Tooltip } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import smoothscroll from 'smoothscroll-polyfill';


export default function CreateStudent() {


    smoothscroll.polyfill()

    const { CSRFToken, user } = useAuth();

    const navigate = useNavigate()

    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }

    const [formData, setFormData] = useState({
        image: null,
        name: "",
        userName: "",
        email: "",
        subjects: [],
        StudentDOB: "",
        StudentGender: "Male",
        StudentCNIC: "",
        StudentClassID:"",
        StudentPhoneNumber:"",
        StudentHomeAddress: "",
        StudentReligion: "Islam",
        StudentMonthlyFee: "",
        FatherName:"",
        MotherName:"",
        GuardiansCNIC:"",
        GuardiansPhoneNumber:"",
        GuardiansPhoneNumber2:"",
        HomeAddress:"",
        GuardiansEmail:""
    });


    const [ClassData , SetClassData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");

    const [open, setOpen] = useState(false)
    const [imgClass, setImgClass] = useState("")

    const topRef = useRef(null)


    const GetClasses = async () =>{
        try {
          const response = await axios.get(
              'http://127.0.0.1:8000/api/GetClasses'
              ,{
                  headers: {
                      'X-CSRF-TOKEN': CSRFToken,
                      'Content-Type': 'application/json',
                      'API-TOKEN': 'IT is to secret you cannot break it :)',
                  },
              }
          );
          if(response.data.success == true){
            SetClassData(response.data.data);
            setFormData(prev => ({
                ...prev,
                StudentClassID: JSON.stringify(response.data.data[0].id)
            }));
          }
          else{
            setErrorMessage(response.data);
          }
      } catch (error) {
          console.error(error);
          setErrorMessage({ success: false, message: "Failed to Load Classes" });
      }}


      function handleImgClick () {
        document.getElementById("studentImageInput").click()
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.onload = () => {
                const dataURL = reader.result
                setFormData((prev) => {return {...prev, image: dataURL}})
            }
            reader.readAsDataURL(file);
        }
    }

      useEffect(()=>{
        GetClasses();
      },[]);






    const [result, setResult] = useState(null);

    const CreateStudent = async (formData) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/CreateStudent',
                formData,
                {
                    headers: {
                        'X-CSRF-TOKEN': CSRFToken,
                        'Content-Type': 'application/json',
                        'API-TOKEN': 'IT is to secret you cannot break it :)',
                    },
                }
            );
            if(response.data.success == true){
                setResult(response.data);
                setSuccessMessage({success:true, message: "New Student created successfully"});
                setFormData({
                    name: "",
                    userName: "",
                    email: "",
                    subjects: [],
                    StudentDOB: "",
                    StudentGender: "Male",
                    StudentCNIC: "",
                    StudentClassID:"",
                    StudentPhoneNumber:"",
                    StudentHomeAddress: "",
                    StudentReligion: "Islam",
                    StudentMonthlyFee: "",
                    FatherName:"",
                    MotherName:"",
                    GuardiansCNIC:"",
                    GuardiansPhoneNumber:"",
                    GuardiansPhoneNumber2:"",
                    HomeAddress:"",
                    GuardiansEmail:""
                });
              }
              else{
                setErrorMessage(response.data);
              }
        } catch (error) {
            setErrorMessage({ success: false, message: "Failed to create Student" });
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CreateStudent(formData);
    };


    function handleInvalid(e){
        if(formData.image){
            return;
        }
        e.preventDefault()
        setOpen(true)
        setImgClass("imgHover")
        scrollToImg()
        setTimeout(()=>{
            setOpen(false)
            setImgClass("")
        }, 1000)
    }
    function scrollToImg(){
        if(topRef.current){
            topRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }





    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const names = [
    'Maths',
    'General Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Pakistan Studies',
    'Urdu',
    'English',
    'Islamiat',
    ];

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev)=>{
        return {
            ...prev,
            // On autofill we get a stringified value.
            subjects: typeof value === 'string' ? value.split(',') : value,
        }
    });
  };




    return (
        <div className='createClass'>
            <div className='mt-2 mb-4'>
                <div className='headingNavbar d-flex justify-content-center'>
                    <div className='d-flex'>
                        <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                        <h4 ref={topRef}>Dashboard \ Admit a new Student</h4>
                    </div>
                    <div className='ms-auto me-4'></div>
                </div>
            </div>
            <form onSubmit={handleSubmit} onInvalid={(e)=>{handleInvalid(e)}}>
            <div className='row m-0 p-0'>
            <div className='FormBorder ms-auto me-auto'>
            <center><h2 className='protest-revolution-regular mb-3'>Students Data</h2></center>
                    <Tooltip
                        title="Add Student's Image"
                        arrow
                        placement="bottom"
                        size="lg"
                        variant="solid"
                        open={open}
                    >
                        <div className={"profile-container ms-auto me-auto mb-3 " + imgClass} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}} >
                            <img src={formData.image ? formData.image : defaultImg} alt="Profile Icon" className="profile-icon" onClick={handleImgClick} />
                        </div>
                    </Tooltip>
                    <input id='studentImageInput' className='imageInput d-none' name='image' type='file' onChange={handleFileChange} required />
                    <div className='d-flex flex-column mt-4'>
                        <input
                            className='Forminput'
                            placeholder='Enter name of Student'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            placeholder='Enter UserName of Student'
                            name='userName'
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='email'
                            value={formData.email}
                            placeholder='Enter Email of Student'
                            name='email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <InputLabel className='mb-1 mt-2' id="demo-multiple-chip-label">Subjects</InputLabel>
                    <Tooltip 
                        title="Select the student's subjects" 
                        arrow
                        placement="bottom"
                        size="lg"
                        variant="solid"
                    >
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={formData.subjects}
                            onChange={handleSelectChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {names.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                >
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Tooltip>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='date'
                            placeholder='Enter DOB of Student'
                            name='StudentDOB'
                            value={formData.StudentDOB}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <label className='label'>Gender of Student</label>
                        <select
                            id='Genders'
                            className='Forminput'
                            value={formData.StudentGender}
                            name='StudentGender'
                            onChange={handleChange}
                            required
                        >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Not Sure'>Not Sure</option>
                            <option value='Still Not Sure'>Still Not Sure</option>
                            <option value='Good Question!'>Good Question!</option>
                        </select>
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter CNIC of Student'
                            name='StudentCNIC'
                            value={formData.StudentCNIC}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <label className='label'>Class of Student</label>
                        <select
                            id='StudentClass'
                            className='Forminput'
                            name='StudentClassID'
                            onChange={handleChange}
                            value={formData.StudentClassID}
                            required
                        >
                        {ClassData && ClassData.map((Class) => {
                            return (<option value={Class.id}>{Class.ClassRank} {" "} { " " }  {Class.ClassName}</option>);
                        })}
                        </select>
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Phone Number of Student'
                            name='StudentPhoneNumber'
                            value={formData.StudentPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Home Address of Student'
                            name='StudentHomeAddress'
                            value={formData.StudentHomeAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <label className='label'>Religion of Student</label>
                        <select
                            id='religions'
                            className='Forminput'
                            name='StudentReligion'
                            value={formData.StudentReligion}
                            onChange={handleChange}
                            required
                        >
                            <option value='Islam'>Islam</option>
                            <option value='Christianity'>Christianity</option>
                            <option value='Irreligion'>Irreligion</option>
                            <option value='Hinduism'>Hinduism</option>
                            <option value='Buddhism'>Buddhism</option>
                        </select>
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='number'
                            placeholder='Enter Monthly fee of Student'
                            name='StudentMonthlyFee'
                            value={formData.StudentMonthlyFee}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    

            </div>
            <div className='parentsForm FormBorder ms-auto me-auto'>
            <center><h2 className='protest-revolution-regular'>Parents Data</h2></center>
                
                    <div className='d-flex flex-column'>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter name of Father'
                            name='FatherName'
                            onChange={handleChange}
                            value={formData.FatherName}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter name of Mother'
                            name='MotherName'
                            onChange={handleChange}
                            value={formData.MotherName}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter CNIC of Guardians'
                            name='GuardiansCNIC'
                            value={formData.GuardiansCNIC}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter phone number of Guardians'
                            name='GuardiansPhoneNumber'
                            value={formData.GuardiansPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Extra Phone Number Just in case'
                            name='GuardiansPhoneNumber2'
                            value={formData.GuardiansPhoneNumber2}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Home Address of Guardians'
                            name='HomeAddress'
                            value={formData.HomeAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3 mb-3'>
                        <input
                            className='Forminput'
                            type='email'
                            placeholder='Enter Email of Guardians'
                            name='GuardiansEmail'
                            onChange={handleChange}
                            value={formData.GuardiansEmail}
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className='errorDiv mt-3'>
                            <p>{errorMessage.message}</p>
                        </div>
                        
                    )}
                    {SuccessMessage ? <div className='successDiv'>
                            <p>{SuccessMessage.message}</p>
                        </div> : null}
                
                
                    <div className='d-flex flex-column '>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                    </div>
            </div>
            
            </div>
            </form>
        </div>
    );
}
