import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Select from '@mui/material/Select';
import { Button, InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetClasses, setError, setPopup } from "../../redux/slices/Admin/UploadLecture";
import LoadingOverlay from "../common/LoadingOverlay";
import CustomPopup from "../common/CustomPopup";
import { GetTeachers, setError as createClassSetError, setPopup as createClassSetPopup } from "../../redux/slices/Admin/CreateClass";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { submitTimetableLecture, setPopup as createTimeTableSetPopup, setError as createTimeTableSetError } from "../../redux/slices/Admin/CreateTimetables";

const autoGenerate = () => {
    // hmmmm
}



export default function CreateTimetables() {

    const topRef = useRef(null)
    const navigate = useNavigate()
    const { classesData, loading, error, popup } = useSelector(state => state.uploadLecture)
    const { loading: createTimeTableLoading, error: createTimeTableError, popup: createTimeTablePopup } = useSelector(state => state.createTimeTable)
    const { teachersData, loading: createClassLoading, error: createClassError, popup: createClassPopup } = useSelector(state => state.createClass)
    const dispatch = useDispatch()

    const query = ['users:id,name,email','subjects:id,UsersID,SubjectName']

    useEffect(()=>{
        dispatch(GetClasses())
        dispatch(GetTeachers(query))
    }, [])

    const options = []

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const [formData, setFormData] = useState({
        classId: null,
        teacherId: null,
        startTime: null,
        endTime: null,
        day: days[0],
    })
    const [subject, setSubject] = useState("")


    const handleChange = (e)=>{
        const { name, value } = e.target
        setFormData(prev=>({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(()=>{
        const teacher = teachersData.filter((teacher)=>(teacher.id===formData.teacherId))
        console.log(teacher);
        if(teacher.length > 0){
            setSubject(teacher[0].subjects.SubjectName)
        }
    }, [formData.teacherId])

    const handleSubmit = (e) =>{
        e.preventDefault()
        let dataToSend = {
            ...formData,
            endTime: new Date(formData.endTime).toLocaleTimeString('en-GB', {   hour: 'numeric', minute: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
            startTime: new Date(formData.startTime).toLocaleTimeString('en-GB', {hour: 'numeric', minute: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
            subject: subject,
        }
        console.log("dataToSend: ", dataToSend);
        dispatch(submitTimetableLecture(dataToSend)).unwrap().then(()=>{
            setSubject("")
            setFormData(prev => ({
                ...prev,
                classId: null,
                teacherId: null,
                day: days[0],
            }))
            return
        }).catch(()=>{
            return
        })
    }

  return (
    <>
        <LoadingOverlay loading={loading || createClassLoading || createTimeTableLoading} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="dashboard">
            <div className="mt-2 mb-4">
                <div className="headingNavbar d-flex justify-content-center">
                <div className="d-flex">
                <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                    <h4 tabIndex="-1" ref={topRef} >Dashboard \ Timetables</h4>
                </div>
                <div className="ms-auto me-4"></div>
                </div>
                <div className='FormBorder ms-auto me-auto'>       
                    <form onSubmit={handleSubmit}>
                        <InputLabel id="timetableClass">Select Class</InputLabel>
                        <Select
                            labelId="timetableClass"
                            id="demo-multiple-chip"
                            input={<OutlinedInput value="options" id="select-multiple-chip" label="Chip" />}
                            value={formData.classId}
                            onChange={handleChange}
                            required
                            name="classId"
                        >
                        {classesData && classesData.map((Class) =>{
                            return <MenuItem 
                                key={Class.id} 
                                value={Class.id}
                            >
                                {`${Class.ClassRank} ${Class.ClassName}`}
                            </MenuItem>
                        })}
                        </Select>
                            <TimePicker value={FormData.startTime} required className="mt-3" name="startTime" onChange={(newValue)=>{setFormData(prev=>({...prev, startTime: newValue}))}} label="Start Time" />
                            <TimePicker value={FormData.endTime} required className="mt-3" name="endTime" onChange={(newValue)=>{setFormData(prev=>({...prev, endTime: newValue}))}} label="End Time" />
                        <InputLabel id="timetableTeacher">Select Teacher</InputLabel>
                        <Select
                            labelId="timetableTeacher"
                            id="demo-multiple-chip"
                            input={<OutlinedInput value="options" id="select-multiple-chip" label="Chip" />}
                            value={formData.teacherId}
                            onChange={handleChange}
                            required
                            name="teacherId"
                        >
                        {teachersData && teachersData.map((teacher) =>{
                            return <MenuItem 
                                key={teacher.id} 
                                value={teacher.id}
                            >
                                {`${teacher.users.name}`}
                            </MenuItem>
                        })}
                        </Select>
                        <InputLabel id="timetableSubject">Subject</InputLabel>
                        <Select
                            labelId="timetableSubject"
                            id="demo-multiple-chip"
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            value={subject}
                            required
                            name="subject"
                        >
                            <MenuItem  
                                value={subject}
                            >
                                {`${subject}`}
                            </MenuItem>
                        </Select>
                        <InputLabel id="timetableTeacher">Select Day</InputLabel>
                        <Select
                            labelId="timetableTeacher"
                            id="demo-multiple-chip"
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            value={formData.day}
                            onChange={handleChange}
                            required
                            name="day"
                        >
                        {days.map((day, index) =>{
                            return <MenuItem 
                                key={index} 
                                value={day}
                            >
                                {`${day}`}
                            </MenuItem>
                        })}
                        </Select>
                        <Button className='mt-3' type="submit" variant="contained" color="primary" style={{borderTop: "none"}}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
        <CustomPopup 
            Visible={popup}
            OnClose={() => {
              dispatch(setPopup(false))
              setTimeout(() => {
                dispatch(setError(null))
              }, 400);
            }}
            errorMessage={error}
        />
        <CustomPopup 
            Visible={createClassPopup}
            OnClose={() => {
              dispatch(createClassSetPopup(false))
              setTimeout(() => {
                dispatch(createClassSetError(null))
              }, 400);
            }}
            errorMessage={createClassError}
        />
        <CustomPopup 
            Visible={createTimeTablePopup}
            OnClose={() => {
              dispatch(createTimeTableSetPopup(false))
              setTimeout(() => {
                dispatch(createTimeTableSetError(null))
              }, 400);
            }}
            errorMessage={createTimeTableError}
        />
        </LocalizationProvider>
    </>
  );
}
