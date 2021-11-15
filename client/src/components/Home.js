import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
      <p>This is the homepage.</p>
      <p>Restaurant owner? Click below.</p>
      <Link to="secondview"><button>Register</button></Link>
      </div>
      
    </div>
  )
}
