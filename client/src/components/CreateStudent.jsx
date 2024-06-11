import React, { useState, useEffect } from 'react';
import "../css/Teacher.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function CreateStudent() {
    const { CSRFToken, user } = useAuth();

    const navigate = useNavigate()

    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }

    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
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
          SetClassData(response.data);
      } catch (error) {
          console.error(error);
          setErrorMessage({ success: false, message: "Failed to Load Classes" });
      }}
    
    
      useEffect(()=>{
        GetClasses();
      },[]);






    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage({ success: false, message: "Failed to create Student" });
        }
    };

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
        CreateStudent(formData);
    };

    return (
        <div className='createClass'>
            <div className='mt-2 mb-4'>
                <div className='headingNavbar d-flex justify-content-center'>
                    <div className='d-flex'>
                        <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                        <h4>Dashboard \ Admit a new Student</h4>
                    </div>
                    <div className='ms-auto me-4'></div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='row m-0 p-0'>
            <div className='FormBorder ms-auto me-auto'>
            <center><h2 className='protest-revolution-regular'>Students Data</h2></center>
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
                        {ClassData && ClassData.data.map((Class) => {
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
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='text'
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
                    <div className='d-flex flex-column mt-3'>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                    </div>
            </div>
            
            </div>
            </form>
        </div>
    );
}
