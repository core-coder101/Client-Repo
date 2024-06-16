import React, { useState , useEffect } from 'react'
import "../css/Login.css"
import { useAuth } from './context/AuthProvider'

export default function Login() {
    const [role, setRole] = useState("Student")
    const [formData, setFormData] = useState({ email: "", password: "" })

    const { result } = useAuth()

    const { login } = useAuth()

    
    const [errorMessage, setErrorMessage] = useState("")
    useEffect(()=>{
        if(!result.success){
            setErrorMessage(result.message)
        }
    }, [result])
    

    formData.role = role

    function handleChange(e) {
        let { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        setErrorMessage("")
    }
    function handleSubmit(e) {
        e.preventDefault();
        login(formData)
    }

    return (
        <div className='Login'>
            <div className='blur'>
                <div className='Main'>
                    <h1 className='protest-revolution-regular mt-5 mb-5' style={{whiteSpace: "nowrap", color: "white"}} >Hustler's University</h1>
                    <form onSubmit={handleSubmit}>
                        <input name='email' type='email' placeholder='Email' onChange={handleChange} value={formData.email} required />
                        <input name='password' type='password' placeholder='Password' onChange={handleChange} value={formData.password} required />
                        <div className='rememberMe'>
                            <input name='rememberMe' type='checkbox' defaultChecked />
                            <p style={{color: "white"}}>Remember me?</p>
                        </div>
                        {errorMessage ? <div className='errorDiv'>
                            <p style={{color: "white"}}>{errorMessage}</p>
                        </div> : null}
                        <button type='submit'>Login</button>
                        <p style={{color: "white"}} className='mb-5'>Forgot password? <button className='admin' onClick={() => { }}>Forgot Password</button></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
