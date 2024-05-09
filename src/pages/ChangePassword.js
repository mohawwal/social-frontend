import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate()



  const changePasswordBtn = () => {
    axios.put("http://localhost:3001/auth/changePassword", 
    {oldPassword: oldPassword, newPassword: newPassword}, {
      headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response) => {
      if(response.data.error) {
        alert({error: "wrong password entered"})
      }
      navigate('/')
    })
  }

  return (
    <div>
      <h1>password change here</h1>
      <input type='password' placeholder='Old password' onChange={(e)=> {setOldPassword(e.target.value)}}/>
      <input type='password' placeholder='New password' onChange={(e) => {setNewPassword(e.target.value)}} />
      <div>
        <button onClick={changePasswordBtn}>save change</button>
      </div>
    </div>
  )
}

export default ChangePassword
