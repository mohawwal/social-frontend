import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../helper/AuthContext'
import { Link } from 'react-router-dom'
import "../App.css";

const Profile = () => {
    let navigate = useNavigate()
    let {id} = useParams()
    const [username, setUsername] = useState('')
    const [listOfPosts, setListOfPost] = useState([])
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })

        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
          setListOfPost(response.data)
        })
    }, [])

  return (
    <div className='profile'>
      <div className='profile-Information'>
        <h1>{username}</h1>
        {authState.username === username && <button onClick={() => {navigate('/ChangePassword')}}>Change My Password</button> }
      </div>
      <div className='post'>{listOfPosts.map((value, key) => {
        return (
          <div key={key} className='eachPost'>
            <h4>{value.title}</h4>
            <br/>
            <p onClick={() => {navigate(`/post/${value.id}`)}}>
              {value.postText}
            </p>
            <br/>
            <div>Post Likes - {value.Likes.length}</div>
          </div>
        )
      })}</div>
    </div>
  )
}

export default Profile
