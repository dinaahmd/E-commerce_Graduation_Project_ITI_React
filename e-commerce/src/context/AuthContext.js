import { createContext, useEffect, useState } from "react";
import React from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    // localStorage.getItem()
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    let loginUser = async (e )=> {
        e.preventDefault()
        // console.log("submitted correct")
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value , 'password':e.target.password.value})
        })   
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')

        }else{
            alert('invalid name or password!')
        }

    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }

    let updateToken = async ()=> {
        console.log("fresh")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
    }
    useEffect(() => {
        let FourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
          if (authTokens) {
            updateToken();
          }
        }, FourMinutes);
    
        return () => clearInterval(interval);
      }, [authTokens, loading]);
    
      if(loading){
        setLoading(false)
    }


    let contextData = {
        user : user,
        authTokens : authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
         return (
        <AuthContext.Provider value={ contextData }>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
