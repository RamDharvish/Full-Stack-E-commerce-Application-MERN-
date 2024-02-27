import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()

  const handleSignup=(e)=> {
   e.preventDefault()
   axios.post('http://localhost:5000/account/signup',{name,email,password})
   .then(res=>navigate('/login'))
   .catch(err=>console.log("err",err))
  }
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="w-50 bg-primary p-3 text-white ">
          <form onSubmit={handleSignup}>
          <h3>Signup</h3>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="mt-3 btn btn-success">Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup