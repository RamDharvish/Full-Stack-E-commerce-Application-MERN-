import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ViewProduct() {
  const [data,setData]=useState([])
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const [stock,setStock]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    useEffect(()=> {
        axios.get('http://localhost:5000/products/getProduct/'+id)
        .then(res =>{
            setName(res.data.name)
            setType(res.data.type)
            setStock(res.data.stock)
            setPrice(res.data.price)
            setDescription(res.data.description)
            setData(res.data)
        }).catch(err =>console.log(err))
    },[id])
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center bg-black '>
      <div className="w-50 bg-white p-3">
       <div className="row">
        <div style={{height:"170px"}} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"> 
          <img src={`http://localhost:5000/${data.image}`} alt="" height={"100%"} width={"100%"}/>
          <button className='btn btn-warning form-control' onClick={()=>navigate('/admin')}>Back to dashboard</button>

        </div>
        <div style={{height:"200px"}} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h1 className='fw-bold '>{name}</h1>
          <h3>{type}</h3>
          <h5>{description}</h5>
          <p className={stock<20?"text-danger fw-bold ":"text-success fw-bold"}>{stock} stock left !</p>
          <button className='btn btn-success form-control'>{price} Rs</button>
        </div>
       </div>
      </div>
      </div>
  )
}

export default ViewProduct