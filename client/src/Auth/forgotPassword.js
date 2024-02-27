import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import axios from 'axios'
function ForgotPassword() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirm,setConfirm]=useState('')

    

    const changePassword=(e)=> {
      e.preventDefault()
      if(confirm !==password) {
        alert("your confirm password was not same as password")
      }else {
       axios.put('http://localhost:5000/account/forgotPassword',{email,password})
       .then(res =>console.log(res))
       .catch(err =>console.log(err))
         
      }
    }
  return (
    <div>
    <Navbar/>
    <div className='bg-white vh-100 d-flex justify-content-center align-items-center '>
        <div className="w-50 p-3 bg-primary text-white ">
            <form onSubmit={changePassword}>
          <h3>Forgot Password</h3>
          <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Enter Your password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder='Confirm password' onChange={(e)=>setConfirm(e.target.value)}/>
            </div>
            <button className='mt-3 btn btn-warning '>Submit</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default ForgotPassword