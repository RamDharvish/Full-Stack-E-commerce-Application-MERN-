import React from 'react'
import './navbar.css'
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
function VisitorNav({setSearchItem,id,input,cartItem}) {
  const navigate=useNavigate()
  
  return (
    <div className='visitorNav'>
        <div className="row">
        <div className="col-12 col-sm-3 col-md-3 col-xl-3 col-xxl-3 d-flex align-items-center ">
          <h3 className='fw-bold'>SH0PPY</h3>
        </div>
         
        <div className="col-6 col-sm-5 col-md-5 col-xl-5 col-xxl-5 d-flex align-items-center">
        {input ? 
         <input type="text" className='form-control' placeholder ="Search . . . . ." onChange={(e)=>setSearchItem(e.target.value)}/>
        :""}
        </div>

        <div className="col-3 col-sm-2 col-md-2 col-xl-2 col-xxl-2 d-flex align-items-center d-flex justify-content-end ">
         <AiOutlineShoppingCart className='cart' onClick={()=>navigate(`/visitor/cart/${id}`)}/>
         <span className='text-danger fw-bold '><p>{cartItem ? cartItem.length : ""}</p></span>
        </div>
        <div className="col-3 col-sm-2 col-md-2 col-xl-2 col-xxl-2 d-flex align-items-center d-flex justify-content-end">
         <CgProfile className='profile' onClick={()=>navigate(`/visitor/userProfile/${id}`)}/>
        </div>

        </div>
        
    </div>
  )
}

export default VisitorNav