import React, { useEffect, useState } from "react";
import "../../assets/css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { UserData, login, toggleRememberMe } from "../../redux/slices/authSlice";
import { GetTeacherClassinfo } from "../../redux/slices/Teacher/StudentAttendance";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { loading, error, popup, rememberMe } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit=(e) =>{
    e.preventDefault();
    dispatch(login(formData))
    .unwrap()
    .then(()=>{
      dispatch(UserData())
      .unwrap()
      .then((result)=>{
        if(result.data.role === "Teacher"){
          dispatch(GetTeacherClassinfo())
        }
        return
      })
      .catch(()=>{
        return
      })
      return
    })
    .catch(()=>{
      return
    })
  }


  // using the redux loading state directly does not work properly
  const [localLoading, setLocalLoading] = useState(false)
  useEffect(()=>{
    setLocalLoading(loading)
  }, [loading])

  const pStyles = {
      color: "white",
      marginBottom: "5px",
      fontSize: "smaller",
  }

  return (
    <div className="Login">
      <div className="blur">
        <div className="Main">
          <h1
            className="protest-revolution-regular mt-5 mb-5"
            style={{ whiteSpace: "nowrap", color: "white", textAlign: "center" }}
          >
            Hustler's University
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required  
            />
            <div className="rememberMe">
              <input onClick={()=>{dispatch(toggleRememberMe())}} name="rememberMe" type="checkbox" checked={rememberMe} />
              <p>Remember me?</p>
            </div>
            {localLoading ? (
              <div className="errorDiv" style={{backgroundColor: "rgba(58, 54, 54, 0.45)"}}>
                <p style={pStyles}>{error}</p>
              </div>
            ) : null}
            {popup ? (
              <div className="errorDiv">
                <p style={pStyles}>{error}</p>
              </div>
            ) : null}
            <button type="submit" disabled={localLoading}>
              Login
            </button>
            <p style={pStyles} className="mb-5">
              Forgot password?{" "}
              <button className="admin" onClick={() => {}}>
                Forgot Password
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
