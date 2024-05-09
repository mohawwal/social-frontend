import React, { useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import "../App.css"
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../helper/AuthContext';


function CreatePost() {

    let navigate = useNavigate()

    const initialValues = {
        title: "",
        postText: ""
    };
    // const { authState } = useContext(AuthContext)

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        postText: Yup.string().required(),
    })

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate('/login')
        }
    }, [])

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, { 
            headers: {accessToken: localStorage.getItem("accessToken")}
         }).then((response) => {
            console.log("post created from react")
            navigate("/")
        })
    }


    return (
        <div className='createPostPage' style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='form' style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Title: </label>
                <Field className='input' 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="Subject"
                />
                <ErrorMessage name='title' component="span" className="error"/>
    
                <label>Post: </label>
                <Field className='input-text text-post' 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="Message"
                />
                <ErrorMessage name='postText' component="span" className="error"/>
                
                <button className='create-btn' type='submit' >Create Post</button>
            </Form>
          </Formik>
        </div>
      );
    }
    
    export default CreatePost;