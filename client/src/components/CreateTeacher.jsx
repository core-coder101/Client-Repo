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


export default function CreateTeacher() {    


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
        TeacherDOB: "",
        TeacherCNIC: "",
        TeacherPhoneNumber: "",
        TeacherHomeAddress: "",
        TeacherReligion: "Islam",
        TeacherSalary: "",
    });


    const [errorMessage, setErrorMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");

    const [open, setOpen] = useState(false)
    const [imgClass, setImgClass] = useState("")

    const topRef = useRef(null)

    const createTeacher = async (formData) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/CreateTeacher',
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
                setSuccessMessage({success:true, message:"New Teacher created successfully"})
                setFormData({
                    name: "",
                    userName: "",
                    email: "",
                    subjects: [],
                    TeacherDOB: "",
                    TeacherCNIC: "",
                    TeacherPhoneNumber: "",
                    TeacherHomeAddress: "",
                    TeacherReligion: "Islam",
                    TeacherSalary: "",
                });
              }
              else{
                setErrorMessage(response.data);
              }
        } catch (error) {
            setErrorMessage({ success: false, message: "Failed to create teacher" });
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

    function handleImgClick () {
        document.getElementById("teacherImageInput").click()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTeacher(formData);
    };










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



  function handleInvalid(e){
    if(formData.image){
        return
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



    return (
        <div className='createClass'>
            <div className='mt-2 mb-4'>
                <div className='headingNavbar d-flex justify-content-center'>
                    <div className='d-flex'>
                        <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                        <h4 ref={topRef} >Dashboard \ Admit a new teacher</h4>
                    </div>
                    <div className='ms-auto me-4'></div>
                </div>
            </div>
            <div className='FormBorder ms-auto me-auto'>       
                <form onSubmit={handleSubmit} onInvalid={(e)=>{handleInvalid(e)}}>
                    <Tooltip
                        title="Add Teacher's Image"
                        arrow
                        placement="bottom"
                        size="lg"
                        variant="solid"
                        open={open}
                    >
                        <div className={"profile-container ms-auto me-auto mb-3 " + imgClass}>
                            <img src={formData.image ? formData.image : defaultImg} alt="Profile Icon" className="profile-icon" onClick={handleImgClick} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}} />
                        </div>
                    </Tooltip>
 
                    <input id='teacherImageInput' className='imageInput d-none' name='image' type='file' onChange={handleFileChange} />
                    <div className='d-flex flex-column'>
                        <input
                            className='Forminput'
                            placeholder='Enter name of Teacher'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            placeholder='Enter UserName of Teacher'
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
                            placeholder='Enter Email of Teacher'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <InputLabel className='mb-1 mt-2' id="demo-multiple-chip-label">Subjects</InputLabel>
                    <Tooltip 
                        title="Subjects that the Teacher will teach" 
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
                            placeholder='Enter DOB of Teacher'
                            name='TeacherDOB'
                            value={formData.TeacherDOB}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter CNIC of Teacher'
                            name='TeacherCNIC'
                            value={formData.TeacherCNIC}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Phone Number of Teacher'
                            name='TeacherPhoneNumber'
                            value={formData.TeacherPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
                            placeholder='Enter Home Address of Teacher'
                            name='TeacherHomeAddress'
                            value={formData.TeacherHomeAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <label className='label'>Religion of Teacher</label>
                        <select
                            id='religions'
                            className='Forminput'
                            name='TeacherReligion'
                            value={formData.TeacherReligion}
                            onChange={handleChange}
                            required
                        >
                            <option value='Islam'>Islam</option>
                            <option value='Christianity'>Christianity</option>
                            <option value='Atheist'>Atheist</option>
                            <option value='Hinduism'>Hinduism</option>
                            <option value='Buddhism'>Buddhism</option>
                        </select>
                    </div>
                    
                    <div className='d-flex flex-column mt-3 mb-3'>
                        <input
                            className='Forminput'
                            type='number'
                            placeholder='Enter Starting Salary of Teacher'
                            name='TeacherSalary'
                            value={formData.TeacherSalary}
                            onChange={handleChange}
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
                    <div>
                        <button className='btn btn-primary w-100' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
