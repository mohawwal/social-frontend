import React from 'react'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import "../App.css"
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const initialValues = {
        username: "",
        password: ""
    };

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    })

    const onSubmit = (data) => {
        axios.post(`http://localhost:3001/auth`, data).then((response) => {
            console.log(data, response)
            navigate("/")
        })
    }
  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className='form' style={{ display: 'flex', flexDirection: 'column' }}>
                <label>username: </label>
                <Field className='input' 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="username..."
                />
                <ErrorMessage name='username' component="span" className="error"/>
                
                <label>password: </label>
                <Field className='input' 
                    autoComplete="off"
                    type="password"
                    id="inputCreatePost" 
                    name="password" 
                    placeholder="password..."
                />
                <ErrorMessage name='password' component="span" className="error"/>
                
                <button className='create-btn' type='submit' >Register</button>
            </Form>
          </Formik>
    </div>
  )
}

export default Registration
