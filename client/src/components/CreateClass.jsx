import React , {useEffect , useState} from 'react'
import "../css/class.css"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function CreateClass(){
  
  const { ID } = useParams();
  const { CSRFToken, user } = useAuth();
  const [teachers, setteachers] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate()

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
    if(response.data.success == true){
      setteachers(response.data.data);
    }
    else{
      setErrorMessage(response.data);
    }
} catch (error) {
    setErrorMessage({ success: false, message: "Failed to Load Teachers" });
}}


const [formData, setFormData] = useState({
  ClassName:  "",
  ClassRank:  "",
  ClassFloor: "",
  ClassTeacherID: "",
  ClassID : ""
});

const [ClassData , SetClassData] = useState();

const GetClassData = async () =>{
  try {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/GetClassData?ID=${ID}`
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
      SetClassData(response.data);
      setFormData({
        ClassName:  response.data.data.ClassName,
        ClassRank:  response.data.data.ClassRank,
        ClassFloor: response.data.data.ClassFloor,
        ClassTeacherID: response.data.data.ClassTeacherID,
        ClassID : response.data.data.id
      });
    }
    else{
      setErrorMessage(response.data);
    }
} catch (error) {
    setErrorMessage({ success: false, message: "Failed to Load Edit Class" });
}
}



useEffect(()=>{
  if(ID){
    GetClassData()
  }
},[])


useEffect(()=>{
  GetTeachers();
},[]);


const [result, setResult] = useState(null);

const CreateClass = async (formData) => {
  if(formData.ClassID == ""){
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
      if(response.data.success == true){
        setResult(response.data);
        setSuccessMessage({success: true, message: "Successfully Created a new Class"})
        setFormData({
          ClassName:  "",
          ClassRank:  "",
          ClassFloor: "",
          ClassTeacherID: "",
          ClassID : ""
        });
      }
      else{
        setErrorMessage(response.data);
      }
  } catch (error) {
      console.error(error);
      setErrorMessage({ success: false, message: "Failed to create Class" });
  }
}
else{
  try {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/UpdateClass',
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
      setSuccessMessage({success: true, message: "Successfully Updated selected Class"})
      setFormData({
        ClassName:  "",
        ClassRank:  "",
        ClassFloor: "",
        ClassTeacherID: "",
        ClassID : ""
      });
    }
    else{
      setErrorMessage(response.data);
    }
} catch (error) {
    setErrorMessage({ success: false, message: "Failed to Update Class" });
}
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
  CreateClass(formData);
};

    return(
        <div className='createClass'>
        <div className='mt-2 mb-4'>
          <div className='headingNavbar d-flex justify-content-center'>
            <div className='d-flex'><FaRegArrowAltCircleLeft className='arrow' onClick={()=>{navigate("/")}} /><h4>Dashboard \ Create a New Class</h4></div>
            <div className='ms-auto me-4'></div>
          </div>
        </div>
        <div className='FormBorder ms-auto me-auto'>
        <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column'>
        <label className='label'>Name of the Class</label>
        <input className='Forminput' placeholder='Enter name of Class' name='ClassName' value={formData.ClassName} onChange={handleChange}  defaultValue={ClassData? ClassData.data.ClassName : ""} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Rank of the Class</label>
        <input className='Forminput' type='number' placeholder='Enter Rank of Class' name='ClassRank' value={formData.ClassRank} onChange={handleChange} defaultValue={ClassData? ClassData.data.ClassRank : ""} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Floor</label>
        <input className='Forminput' placeholder='Enter name of Floor' name='ClassFloor' value={formData.ClassFloor} onChange={handleChange} defaultValue={ClassData? ClassData.data.ClassFloor : ""} required></input>
        </div>
        <div className='d-flex flex-column mt-3'>
        <label className='label'>Name of the Teacher</label>
        <select id="cars" className='Forminput mb-3' name="ClassTeacherID" value={formData.ClassTeacherID} onChange={handleChange} required>
        <option></option>
        {ClassData && ClassData.data.id ? 
          <option value={ClassData.data.teachers.id} >{ClassData.data.teachers.user.name}</option> : ""}
        {teachers && Object.values(teachers).length > 0 && Object.values(teachers).map((teacher, index) => {
            return <option value={teacher.id} >{teacher.user.name}</option>;
        })}
        </select>
        </div>
        {errorMessage.message ? <div className='errorDiv'>
                            <p>{errorMessage.message}</p>
                        </div> : null}

                        {SuccessMessage ? <div className='successDiv'>
                            <p>{SuccessMessage.message}</p>
                        </div> : null}
        <div>
            <button className='btn btn-primary w-100' type='submit'>Submit</button>
        </div>
        </form>
        </div>
        </div>
    );
}