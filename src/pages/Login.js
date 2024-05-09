import React, { useState, useContext } from 'react'
import "../App.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext';

const Login = () => {

  let navigate = useNavigate()

    const [ username, setUsername ] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)

    const login = () => {
      const data = {username: username, password: password}
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if(!response.data.error) {
          localStorage.setItem("accessToken", response.data.token)
          setAuthState({username: response.data.username, id: response.data.id, status: true})
          navigate("/")
        }else {
          console.log(response.data.error);
        }
      })
      
      .catch(error => {
        if(error.response) {
          console.log('Error status code:', error.response.status)
          console.log('Error data:', error.response.data)
          alert('Error: ' + error.response.data.error)
        }else if (error.request) {
          console.log('No response received:', error.request)
        } else {
          console.log('Error', error.message)
        }
      })
    }

  return (
    <div>
      <div><input type='text' placeholder='username...' onChange={(e) => setUsername(e.target.value)}/></div>
      <div><input type='password' placeholder='password...' onChange={(e) => setPassword(e.target.value)}/></div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login