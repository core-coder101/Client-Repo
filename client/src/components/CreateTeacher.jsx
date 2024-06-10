import React, { useState, useEffect } from 'react';
import "../css/Teacher.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuth } from './context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function CreateTeacher() {
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
        TeacherDOB: "",
        TeacherCNIC: "",
        TeacherPhoneNumber: "",
        TeacherHomeAddress: "",
        TeacherReligion: "Islam",
        TeacherSalary: "",
    });

    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setResult({ success: false, message: "Failed to create teacher" });
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
        createTeacher(formData);
    };

    return (
        <div className='createClass'>
            <div className='mt-2 mb-4'>
                <div className='headingNavbar d-flex justify-content-center'>
                    <div className='d-flex'>
                        <FaRegArrowAltCircleLeft onClick={()=>{navigate("/")}} className='arrow' />
                        <h4>Dashboard \ Admit a new teacher</h4>
                    </div>
                    <div className='ms-auto me-4'></div>
                </div>
            </div>
            <div className='FormBorder ms-auto me-auto'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column'>
                        <input
                            className='Forminput'
                            placeholder='Enter name of Teacher'
                            name='name'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            placeholder='Enter UserName of Teacher'
                            name='userName'
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
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <input
                            className='Forminput'
                            type='date'
                            placeholder='Enter DOB of Teacher'
                            name='TeacherDOB'
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
                            placeholder='Enter Starting Salary of Teacher'
                            name='TeacherSalary'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className='errorDiv mt-3'>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <div>
                        <button className='btn btn-primary mt-3 w-100' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
