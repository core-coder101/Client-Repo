import React, {useState} from 'react'
import "../css/Login.css"

export default function Login() {

    const [role, setRole] = useState("Student")
    const [formData, setFormData] = useState({email: "", password: "", role: "Student"})

    formData.role = role

    function handleChange(e){
        let {name, value} = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
    }

  return (
    <div className='Login'>
        <div className='Main'>
            <div className='Role'>
                <button className={role == "Student" ? "Selected" : ""} onClick={()=>{
                    setRole("Student")
                }}>Student</button>
                <button className={role == "Teacher" ? "Selected" : ""} onClick={()=>{
                    setRole("Teacher")
                }}>Teacher</button>
            </div>
            <h1>{role} Login</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input name='email' type='email' placeholder='Email' onChange={(e)=>{handleChange(e)}} value={formData.email} />
                <input name='password' type='password' placeholder='Password' onChange={(e)=>{handleChange(e)}} value={formData.password} />
                <div style={{display: "flex", alignItems: "center", marginLeft: "5px", marginBottom: "10px"}}>
                    <input name='rememberMe' type='checkbox' defaultChecked />
                    <p style={{margin:"0", marginLeft: "5px"}}>Remember me?</p>
                </div>
                <button type='submit'>Login</button>
                <p>Forgot password? <button className='admin' onClick={()=>{    }}>Forgot Password</button></p>
                {role === "Admin" ? null : <p>Admin? <button className='admin' onClick={()=> {setRole("Admin")}} >Login</button></p>}
            </form>
        </div>
    </div>
  )
}
