import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "../App.css"
import { AuthContext } from '../helper/AuthContext';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  let navigate = useNavigate()

    let {id} = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext)

    useEffect(() => {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPostObject(response.data)
      })

      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        setComments(response.data)
      })
    }, [])

    const addComment = () => {
      axios.post(`http://localhost:3001/comments`, {
        commentBody: newComment, 
        PostId: id 
      }, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if(response.data.error) {
          console.log(response.data.error)
        }else {
          const commentToAdd = {
            commentBody: newComment, 
            username: response.data.username 
          }
          setComments([...comments, commentToAdd])
          setNewComment("")
        }
      })
    };

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/${id}`, {headers: 
        {accessToken: localStorage.getItem("accessToken")}
      }).then((response) => {
        setComments(comments.filter((val) => {
          return val.id != id
        }))
      })
    }

    const deletePost = (id) => {
      axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: {accessToken: localStorage.getItem("accessToken")}
      }).then(() => {
        navigate("/")
        alert('delete post success')
      })
    }

    const editPost = (option) => {
      if (option === "title") {
        let newTitle = prompt("Enter New Title")
        axios.put("http://localhost:3001/posts/title", {
          newTitle: newTitle, 
          id: id
        }, {headers: {accessToken: localStorage.getItem("accessToken")}})
        setPostObject({...postObject, title: newTitle})
      }else {
        let newPostText = prompt("Enter New Text")
        axios.put("http://localhost:3001/posts/postText", {
          newText: newPostText,
          id: id}, 
        { headers: {accessToken: localStorage.getItem("accessToken")} })
        setPostObject({...postObject, postText: newPostText})
      }
    }
    
    
  return (
    <div className='tweet'>
      <div className='username'>@{postObject.username}</div>
      <div onClick={() => {
        if(authState.username === postObject.username) {
        editPost("title")
        }
      }}>
        <h2>{postObject.title}</h2>
      </div>
      <div onClick={() => {
        if(authState.username === postObject.username) {
        editPost("body")
        }
      }}>{postObject.postText}</div>
      { authState.username === postObject.username ? <button onClick={() => deletePost(postObject.id)}>delete post</button> : <></> }
      <div className='commentSection'>
        <p>Comment Section</p>
        <div className='addComment'>
          <input type='text' 
            placeholder='Comment...' 
            value={newComment}
            onChange={(e) => {setNewComment(e.target.value)} } 
            autoComplete='off'
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        {comments.length === 0 ? <p>No comment</p> : (
           <div className='listOfComments'>
           {comments.map((comment, key) => {
             return <div key={key} className='comment'>
               {comment.commentBody}
               <label> - username: {comment.username}</label>
               { 
                authState.username === comment.username &&
                <button onClick={() => deleteComment(comment.id)}>DELETE</button>
              }
             </div>
           })}
         </div>
        )}
      </div>
              
    </div>
  )
}

export default Post
