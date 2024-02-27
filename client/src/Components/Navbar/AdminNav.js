import React from 'react'
import './navbar.css'
function AdminNav({setPage}) {
  return (
    <div className='w-100 bg-white '>
        <div className="row">
        <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8  d-flex align-items-center">
          <h2 className='fw-bold text-primary '>SH0PPY</h2>
        </div>
        <div className="col-6 col-sm-2 cool-md-2 col-lg-2 col-xl-2 col-xxl-2 d-flex align-items-center  justify-content-end "
        onClick={()=>setPage('products')}
        >
            <h3>Products</h3>
        </div>

        <div className="col-6 col-sm-2 cool-md-2 col-lg-2 col-xl-2 col-xxl-2 d-flex align-items-center mt-2 justify-content-end"
        onClick={()=>setPage('users')}
        >
            <h3>Users</h3>
        </div>
        </div>
    </div>
  )
}

export default AdminNav