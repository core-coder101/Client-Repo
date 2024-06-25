import React, { useState, useEffect, useRef } from 'react';
import "../../assets/css/Teacher.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../../assets/img/default.png"
import { Tooltip } from "@mui/material"
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import Popup from 'react-animated-popup';
import { useSelector } from 'react-redux';


export default function CreateTeacher() {    
    const { ID } = useParams();


    smoothscroll.polyfill()

    const { CSRFToken, user } = useSelector((state) => state.auth)

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
    const [popup, setPopup] = useState(false)
    // useEffect(()=>{
    //     if(errorMessage){
    //     setPopup(true)
    //     } else {
    //     setPopup(false)
    //     }
    // }, [errorMessage])


    const [open, setOpen] = useState(false)
    const [imgClass, setImgClass] = useState("")

    const topRef = useRef(null)
    const emailRef = useRef(null)

    const [loading, setLoading] = useState(false)

    const createTeacher = async (formData) => {
        setErrorMessage("Adding new teacher. . .")
        setLoading(true)
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
                setErrorMessage("New Teacher created successfully")
                setPopup(true)
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
                setErrorMessage(response.data.message);
                setPopup(true)
              }
        } catch (error) {
            // console.log(error.response.data.message);
            if(error.response.data.message.includes("users_email_unique")){
                setErrorMessage("Email must be unique")
                setPopup(true)
                scrollToElement(emailRef)
            } else{
                setErrorMessage("Failed to create teacher");
                setPopup(true)
            }
        } finally {
            setLoading(false)
        }
    };



    const UpdateTeacher = async (formData) => {
        setErrorMessage("Updating Changes. . .")
        setLoading(true)
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/UpdateTeacher',
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
                setErrorMessage("Teacher Updated successfully")
                setPopup(true)
                setTimeout(()=>{
                    setPopup(false)
                },800)
                setTimeout(()=>{
                    navigate(-1)
                },1400)
              }
              else{
                setErrorMessage(response.data.message);
                setPopup(true)
              }
        } catch (error) {
            setErrorMessage("Failed to Update Teacher");
            setPopup(true)
        } finally {
            setLoading(false)
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage("");
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
        if(!formData.image){
            setOpen(true)
            setImgClass("imgHover")
            scrollToElement(emailRef)
            setTimeout(()=>{
                setOpen(false)
                setImgClass("")
            }, 1000)
        } else if (TeacherData  && TeacherData.users){
            UpdateTeacher(formData);
        }
        else{
            createTeacher(formData);
        }
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




  const [TeacherData , SetTeacherData] = useState();

  const GetTeacherData = async () =>{
    setErrorMessage("Loading teacher. . .")
    setLoading(true)
    try {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/GetTeacherData?ID=${ID}`
          ,{
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
      console.log(response.data);
      if(response.data.success == true){
        SetTeacherData(response.data.data,)
      }
      else{
        setErrorMessage(response.data.message);
        setPopup(true)
      }
  } catch (error) {
        console.error(error)
        setErrorMessage("Failed to Load Edit Teacher");
        setPopup(true)
        navigate("/addteacher")
  } finally{
    setLoading(false)
  }
  }
  


useEffect(()=>{
    if(ID){
        GetTeacherData()
    }
},[]);





useEffect(() => {
    if (TeacherData && TeacherData.users) {
        let subjects = [];

        for (let subject of TeacherData.users.subjects) {
            subjects.push(subject.SubjectName);
        }

        setFormData({
            ID : ID,
            image: `data:image/png;base64,${TeacherData.users.images[0].data}` || "",
            name: TeacherData.users.name || "",
            userName: TeacherData.users.userName || "",
            email: TeacherData.users.email || "",
            subjects: subjects,
            TeacherDOB: TeacherData.TeacherDOB || "",
            TeacherCNIC: TeacherData.TeacherCNIC || "",
            TeacherPhoneNumber: TeacherData.TeacherPhoneNumber || "",
            TeacherHomeAddress: TeacherData.TeacherHomeAddress || "",
            TeacherReligion: TeacherData.TeacherReligion,
            TeacherSalary: TeacherData.TeacherSalary || "",
        });
    }
}, [TeacherData]);






    function handleInvalid(e){
        if(formData.image){
            return
        }
        e.preventDefault()
        setOpen(true)
        setImgClass("imgHover")
        scrollToElement(topRef)
        setTimeout(()=>{
            setOpen(false)
            setImgClass("")
        }, 1000)
    }


function scrollToElement(ref){
    if(ref.current){
        ref.current.scrollIntoView({behavior: 'smooth'})
    }
}



    return (
        <div className='createClass'>
            <div className='mt-2 mb-4'>
                <div className='headingNavbar d-flex justify-content-center'>
                    <div className='d-flex'>
                        <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                        <h4 tabIndex="-1" ref={topRef} >Dashboard \ Admit a new teacher</h4>
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
                        <div className={"profile-container ms-auto me-auto mb-3 " + imgClass} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>
                        <img 
                            src={
                                formData.image ? formData.image :
                                TeacherData && TeacherData.users && TeacherData.users.images  && TeacherData.users.images > 0
                                ? `data:image/png;base64,${TeacherData.users.images[0].data}`
                                : formData.image
                                    ? formData.image
                                    : defaultImg
                            }
                            alt="Profile Icon"
                            className="profile-icon"
                            onClick={handleImgClick}
                        />
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
                            ref={emailRef}
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
                            required
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
                    <Popup visible={popup} animationDuration={400} onClose={() => {setPopup(false); setTimeout(()=>{setErrorMessage("")},400)}} style={{backgroundColor: "rgba(17, 16, 29, 0.95)", boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px", padding: "40px 20px"}}>
                        <div className='d-flex justify-content-center align-items-center' style={{width: "max-content", height: "100%", padding: "0"}}>
                            <h5 style={{color: "white", margin: "0"}}>{errorMessage}</h5>
                        </div>
                    </Popup>
                    <Popup visible={loading} onClose={() => {}} style={{backgroundColor: "rgba(17, 16, 29, 0.95)", boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px", padding: "40px 20px"}}>
                        <div className='d-flex justify-content-center align-items-center' style={{width: "max-content", height: "100%", padding: "0"}}>
                            <h5 dangerouslySetInnerHTML={{ __html: errorMessage }} style={{color: "white", margin: "0"}}></h5>
                        </div>
                    </Popup>
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