import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className='w-100 vh-20 bg-black text-white'>
      <div className="row">
        <div className="col-4 col-sm-4 col-md-6 col-xl-6 col-xxl-6 ">
          <h3 className='fw-bold'>SH0PPY</h3>
        </div>

        <div className="col-4 col-sm-4 col-md-3 col-xl-3 col-xxl-3  d-flex justify-content-end align-items-center">
        <h4><NavLink to={'/signup'} className={'link'}>Signup</NavLink> </h4>

      </div>

      <div className="col-4 col-sm-4 col-md-3 col-xl-3 col-xxl-3  d-flex justify-content-end align-items-center ">
        <h4><NavLink to={'/login'}  className={'link'}>Login</NavLink> </h4>
      </div> 
      </div>

    </div>
  )
}

export default Navbar