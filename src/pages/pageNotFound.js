import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

const pageNotFound = () => {
  return (
    <div className='pageNotFound'>
      <h1>Page not found</h1>
      <Link to='/registration'>Register Page</Link> 
      <div></div>
      <Link to='/'>Home Page</Link>
    </div>
  )
}

export default pageNotFound
