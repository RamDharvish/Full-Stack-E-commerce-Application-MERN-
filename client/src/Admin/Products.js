import React, { useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Products() {
  const [data,setData]=useState([])
  const navigate=useNavigate()

  useEffect(()=> {
    axios.get('http://localhost:5000/products/getProducts')
    .then(res=>setData(res.data))
    .catch(err =>console.log(err))
  },[])

  const handleDelete=(id)=> {
    axios.delete('http://localhost:5000/products/removeProduct/'+id)
    .then(res =>{
      window.location.reload()
      console.log(res)
    }).catch(err =>console.log(err))
  }

  return (
    <div className='vh-100 bg-black  d-flex justify-content-center align-items-center '>
      <div style={{height:"500px"}} className="w-50 bg-white p-3 overflow-x-auto overflow-y-auto ">
      <Link className='btn btn-success' to={'/admin/addProducts'}>Add Product</Link>
     
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"100px",height:"100px"}}>IMG</th>
              <th>NAME</th>
              <th>STOCK</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item,index)=>(
                <tr key={index}>
                  <td><img src={`http://localhost:5000/${item.image}`} width={"100%"} height={"100%"} alt="" /> </td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>
                  <button className='btn btn-success ms-3'  onClick={()=>navigate(`/admin/viewProduct/${item._id}`)}>View</button>
                  <button className='btn btn-warning ms-3' onClick={()=>navigate(`/admin/updateProduct/${item._id}`)}>Update</button>
                  <button className='btn btn-danger ms-3' onClick={()=>handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products