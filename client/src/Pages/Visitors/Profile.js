import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function Profile({setUser}) {
  const {id}=useParams()
  const [userDetails,setUserDetails] =useState([])
  const navigate=useNavigate()
  useEffect(()=> {
 axios.get(`http://localhost:5000/visitors/accountDetails/${id}`)
 .then(res =>setUserDetails(res.data))
 .catch(err =>console.log(err))
  })
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center '>
      <div className="w-50 p-3 details">
        <h1>Name : {userDetails.name}</h1>
        <h2>Email : {userDetails.email}</h2>
       <div className='d-flex justify-content-between mt-5'>
       <h3 className='btn btn-warning' onClick={()=>setUser('myOrders')}>Orders</h3>
      
        <h3  className='btn btn-danger' onClick={()=>navigate('/')}>Logout</h3>
       </div>
      </div>
    </div>
  )
}

export default Profile