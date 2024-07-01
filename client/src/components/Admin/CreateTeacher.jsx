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
import { useDispatch, useSelector } from 'react-redux';
import { GetTeacherByID, UpdateTeacher, createTeacher, setError, setPopup } from '../../redux/slices/CreateTeacherSlice';
import CustomPopup from "./../common/CustomPopup"


export default function CreateTeacher() {    
    const { ID } = useParams();


    smoothscroll.polyfill()

    const { teacherData, loading, error, popup } = useSelector((state) => state.createTeacher)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const [open, setOpen] = useState(false)
    const [imgClass, setImgClass] = useState("")

    const topRef = useRef(null)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            scrollToElement(topRef)
            setTimeout(()=>{
                setOpen(false)
                setImgClass("")
            }, 1000)
        } else if (teacherData  && teacherData.users){
            dispatch(UpdateTeacher(formData))
            .unwrap()
            .then(()=>{
                navigate("/addteacher")
                setFormData({
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
                })
                return
            })
            .catch(()=>{
                // this is done to fix an unhandled promise erorr
                // we are dealing with erorrs in the slice already so we just need to return the promise to avoid error
                return
            })
        }
        else{
            dispatch(createTeacher(formData)).unwrap().then(()=>{
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
                })
                return
            }).catch(()=>{
                return
            })
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

useEffect(()=>{
    if(ID){
        // GetTeacherData()
        dispatch(GetTeacherByID(ID)).unwrap().catch((error) =>{
            navigate("/addteacher")
            return
        })
    }
},[]);

    // using the redux loading state directly does not work properly
    const [localLoading, setLocalLoading] = useState(false)
    useEffect(()=>{
        setLocalLoading(loading)
    }, [loading])


useEffect(() => {
    if (teacherData && teacherData.users) {
        let subjects = [];

        for (let subject of teacherData.users.subjects) {
            subjects.push(subject.SubjectName);
        }

        setFormData({
            ID : ID,
            image: `data:image/png;base64,${teacherData.users.images[0].data}` || "",
            name: teacherData.users.name || "",
            userName: teacherData.users.userName || "",
            email: teacherData.users.email || "",
            subjects: subjects,
            TeacherDOB: teacherData.TeacherDOB || "",
            TeacherCNIC: teacherData.TeacherCNIC || "",
            TeacherPhoneNumber: teacherData.TeacherPhoneNumber || "",
            TeacherHomeAddress: teacherData.TeacherHomeAddress || "",
            TeacherReligion: teacherData.TeacherReligion,
            TeacherSalary: teacherData.TeacherSalary || "",
        });
    }
}, [teacherData]);






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
                        variant="filled"
                        open={open}
                    >
                        <div className={"profile-container ms-auto me-auto mb-3 " + imgClass} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>
                        <img 
                            src={
                                formData.image ? formData.image :
                                teacherData && teacherData.users && teacherData.users.images  && teacherData.users.images > 0
                                ? `data:image/png;base64,${teacherData.users.images[0].data}`
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
                        />
                    </div>
                    <InputLabel className='mb-1 mt-2' id="demo-multiple-chip-label">Subjects</InputLabel>
                    <Tooltip 
                        title="Subjects that the Teacher will teach" 
                        arrow
                        placement="bottom"
                        size="lg"
                        variant="filled"
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
                    <CustomPopup
                        Visible={localLoading}
                        OnClose={() => {}}
                        errorMessage={error}
                    />
                    <CustomPopup
                        Visible={popup}
                        OnClose={() => {dispatch(setPopup(false)); setTimeout(()=>{dispatch(setError(""))},400)}}
                        errorMessage={error}
                    />
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
