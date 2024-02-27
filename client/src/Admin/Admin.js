import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminNav from '../Components/Navbar/AdminNav'
import Products from './Products'
import Users from './Users'
function Admin() {
  const [success,setSuccess]=useState()
  const navigate=useNavigate()
  const [page,setPage]=useState('products')

  axios.defaults.withCredentials=true
  useEffect(()=> {
axios.get('http://localhost:5000/account/verifyUser')
.then(res=> {
if(res.data==="success") {
  setSuccess("success")
}else {
  navigate('/login')
  console.log(res.data)
 
}
}).catch(err =>console.log(err))
  },[])
  return (
    <div className='bg-black vh-100  '>
      <div className="">
        <AdminNav setPage={setPage}/>
      </div>
      {page === 'products' && <Products />}
  
     {page==='users' && <Users/>}
    </div>
  )
}

export default Admin