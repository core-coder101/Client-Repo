import React , {useEffect , useState} from 'react'
import "../css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';

export default function CreateClass(){

  const { CSRFToken, user } = useAuth();
  const [teachers, setteachers] = useState(null);

    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }

  const GetTeachers = async () =>{
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
  GetTeachers();
},[]);


const [result, setResult] = useState(null);



const [formData, setFormData] = useState({
  ClassName: "",
  ClassRank: "",
  ClassFloor: "",
  ClassTeacherID: ""
});

const CreateClass = async (formData) => {
  try {
      const response = await axios.post(
          'http://127.0.0.1:8000/api/CreateClass',
          formData,
          {
              headers: {
                  'X-CSRF-TOKEN': CSRFToken,
                  'Content-Type': 'application/json',
                  'API-TOKEN': 'IT is to secret you cannot break it :)',
              },
          }
      );
      setResult(response.data);
  } catch (error) {
      console.error(error);
      setResult({ success: false, message: "Failed to create teacher" });
  }
};

const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  if (result && !result.success) {
      setErrorMessage(result.message);
  } else {
      setErrorMessage("");
  }
}, [result]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
      ...prev,
      [name]: value,
  }));
  setErrorMessage("");
};

const handleSubmit = (e) => {
  e.preventDefault();
  CreateClass(formData);
};

    return(
        <div className='createClass'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' /><h4>Dashboard \ Create a New Class</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='FormBorder ms-auto me-auto'>
        <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column'>
        <label className='label'>Name of the Class</label>
        <input className='Forminput' placeholder='Enter name of Class' name='ClassName' onChange={handleChange} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Rank of the Class</label>
        <input className='Forminput' type='number' placeholder='Enter Rank of Class' name='ClassRank' onChange={handleChange} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Floor</label>
        <input className='Forminput' placeholder='Enter name of Floor' name='ClassFloor' onChange={handleChange} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Teacher</label>
        <select id="cars" className='Forminput' name="ClassTeacherID" onChange={handleChange}>
        {teachers && Object.values(teachers).length > 0 && Object.values(teachers).map((teacherArray) => {
          if (teacherArray && teacherArray.length > 0) {
            const teacher = teacherArray[0];
            return <option key={teacher.name} value={teacher.id} >{teacher.name}</option>;
          }
          return null;
        })}
        </select>
        </div>
        {errorMessage ? <div className='errorDiv'>
                            <p>{errorMessage}</p>
                        </div> : null}
        <div>
            <button className='btn btn-primary mt-3 w-100' type='submit'>Submit</button>
        </div>
        </form>
        </div>
        </div>
    );
}