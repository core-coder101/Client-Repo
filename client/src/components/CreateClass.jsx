import React , {useEffect , useState} from 'react'
import "../css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';

export default function CreateClass(){

  const { CSRFToken, user } = useAuth();
  const [teachers, setteachers] = useState(null);

  const createTeacher = async () =>{
  try {
    const response = await axios.get(
        'http://127.0.0.1:8000/api/GetTeacher'
        ,{
            headers: {
                'X-CSRF-TOKEN': CSRFToken,
                'Content-Type': 'application/json',
                'API-TOKEN': 'IT is to secret you cannot break it :)',
            },
        }
    );
    setteachers(response.data);
} catch (error) {
    console.error(error);
    setteachers({ success: false, message: "Failed to create teacher" });
}}

useEffect(()=>{
  console.log(teachers);
}, [teachers])

useEffect(()=>{
  createTeacher()
},[]);

    return(
        <div className='createClass'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' /><h4>Dashboard \ Create a New Class</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='FormBorder ms-auto me-auto'>
        <div className='d-flex flex-column'>
        <label className='label'>Name of the Class</label>
        <input className='Forminput' placeholder='Enter name of Class' name='Name' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Rank of the Class</label>
        <input className='Forminput' type='number' placeholder='Enter Rank of Class' name='Rank' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Floor</label>
        <input className='Forminput' placeholder='Enter name of Floor' name='Floor' required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Teacher</label>
        <select id="cars" className='Forminput' name="teachers">
        {teachers && Object.values(teachers).length > 0 && Object.values(teachers).map((teacherArray) => {
          if (teacherArray && teacherArray.length > 0) {
            const teacher = teacherArray[0];
            return <option key={teacher.name} value={teacher.name}>{teacher.name}</option>;
          }
          return null;
        })}
        </select>
        </div>
        <div>
            <button className='btn btn-primary mt-3 w-100' type='button'>Submit</button>
        </div>
        </div>
        </div>
    );
}