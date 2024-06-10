import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const  AuthProvider = ({ children }) => {



    const [CSRFToken, setCSRFToken] = useState('');
    const [result, setResult] = useState("")
    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem("user")
        console.log(storedUser);
        return storedUser ? JSON.parse(storedUser) : ""
    })

    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user))
    }, [result])


    


    useEffect(() => {
        if(!CSRFToken){
          axios.get('http://127.0.0.1:8000/api/csrf-token')
              .then(response => {
                  setCSRFToken(response.data.csrfToken);
              })
              .catch(error => {
                  console.error('Error fetching CSRF token:', error);
              });
            }
      }, [CSRFToken]);



    const login = (formData) => {
        axios.post('http://127.0.0.1:8000/api/login', formData, {
            headers: {
                'X-CSRF-TOKEN': CSRFToken,
                'Content-Type': 'application/json',
                'API-TOKEN': 'IT is to secret you cannot break it :)',
            }
        })
            .then(response => {
                setResult(response.data)
                if(response.data.success){
                    setUser(response.data.data)
                }
                // <Navigate to="/" />
            })
            .catch(error => {
                console.error(error);
            });
    };
    const logout = () => {
        localStorage.clear()
        setResult("")
        setCSRFToken("")
        setUser("")
    };


  return (
    <AuthContext.Provider value={{  user, setUser,login, logout, CSRFToken, setCSRFToken, result, setResult }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)