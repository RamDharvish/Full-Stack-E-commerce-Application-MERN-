import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Link}from 'react-router-dom'
function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  
  axios.defaults.withCredentials=true
  const handleLogin=(e)=> {
   e.preventDefault()
   axios.post('http://localhost:5000/account/login',{email,password})
   .then(res => {
     
    if(res.data.status==="success") {
      if(res.data.role==="admin") {
        navigate('/admin')
      }else {
        let userId=res.data.id
        navigate('/visitor/'+userId)
      }
    }
    console.log(res.data)
   })
   .catch(err =>console.log(err))
  }
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="w-50 bg-primary p-3 text-white ">
          <form onSubmit={handleLogin}>
          <h3>Login</h3>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="mt-3 btn btn-success form-control">Login</button>
            <Link className='link mt-3' to={'/forgotPassword'}>Forgot Password ?</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
