import React, { useState , useEffect } from 'react'
import "../css/Login.css"
import axios from 'axios'

export default function Login() {
    const [role, setRole] = useState("Student")
    const [formData, setFormData] = useState({ email: "", password: "", role: "Student" })
    const [result, setResult] = useState("");

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/csrf-token')
            .then(response => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, []);
    

    formData.role = role

    function handleChange(e) {
        let { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function LoginNow() {
        axios.post('http://127.0.0.1:8000/api/login', formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'API-TOKEN': 'IT is to secret you cannot break it :)',
            }
        })
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        LoginNow();
    }

    return (
        <div className='Login'>
            <div className='Main'>
                <h1 className='protest-revolution-regular mt-5 mb-5'>Hustle University</h1>
                <form onSubmit={handleSubmit}>
                    <input name='email' type='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                    <input name='password' type='password' placeholder='Password' onChange={handleChange} value={formData.password} />
                    <div style={{ display: "flex", alignItems: "center", marginLeft: "5px", marginBottom: "10px" }}>
                        <input name='rememberMe' type='checkbox' defaultChecked />
                        <p style={{ margin: "0", marginLeft: "5px" }}>Remember me?</p>
                    </div>
                    <button type='submit'>Login</button>
                    <p className='mb-5'>Forgot password? <button className='admin' onClick={() => { }}>Forgot Password</button></p>
                </form>
            </div>
        </div>
    )
}
