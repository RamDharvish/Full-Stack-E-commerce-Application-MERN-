import React, { useState } from 'react'
import VisitorNav from '../../Components/Navbar/VisitorNav'
import Profile from './Profile'
import MyOrders from './MyOrders'
function UserProfile() {
    const [user,setUser] =useState('profile')
  return (
    <div className='vh-100'>
    <div className="w-100 bg-primary">
        <div className="row">
        <div className="col-12 col-sm-8 col-md-8 col-xl-8 col-xxl-8 d-flex align-items-center ">
          <h3 className='fw-bold'>SH0PPY</h3>
        </div>

        <div className="col-6 col-sm-2 col-md-2 col-xl-2 col-xxl-2 d-flex align-items-center d-flex justify-content-center">
        <h4 onClick={()=>setUser('myOrders')}>My Orders</h4>
        </div>
        <div className="col-6 col-sm-2 col-md-2 col-xl-2 col-xxl-2 d-flex align-items-center d-flex justify-content-center">
        <h4 onClick={()=>setUser('profile')}>Profile</h4>
        </div>
        </div>
    </div>
        {
            user==="profile" ? <Profile setUser={setUser}/>:<MyOrders/>
        }
    </div>
  )
}

export default UserProfile