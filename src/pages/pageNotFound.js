import React from 'react'
import { Link } from 'react-router-dom'

const pageNotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to='/registration'>Register Page</Link> 
      <div></div>
      <Link to='/'>Home Page</Link>
    </div>
  )
}

export default pageNotFound
