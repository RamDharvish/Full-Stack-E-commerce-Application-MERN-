import React, { useState } from 'react'
import AdminNav from '../Components/Navbar/AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function AddProduct() {
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const [stock,setStock]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const navigate=useNavigate()

    const handleAddProduct=()=> {
      const formData=new FormData()
      formData.append("name",name)
      formData.append("type",type)
      formData.append("stock",stock)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("image",image)
      axios.post('http://localhost:5000/products/addProduct',formData)
      .then(res=>navigate('/admin'))
      .catch(err =>console.log(err))
    }
    return (
        <div className=''>
            <div className="d-flex justify-content-center">
                <h1>ADD PRODUCT</h1>
            </div>
            
            <div className="mt-3 ms-5 me-5">
                <label><h3>Product Name</h3></label>
                <input type="text" className='form-control border-5 ' placeholder="Enter the Product Name" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mt-3 ms-5 me-5">
                <label><h3>Product Type</h3></label>
                <select className='form-control border-5' onChange={(e)=>setType(e.target.value)} >
                   
                    <option>General</option>
                    <option>Mobiles</option>
                    <option>Watches</option>
                    <option>Toys</option>
                    <option>Mens</option>
                    <option>Womens</option>
                </select>
            </div>

            <div className="mt-2 ms-5 me-5">
                <label><h3>Stock</h3></label>
                <input type="number" className='form-control border-5 ' placeholder="Amount Of Stock" onChange={(e)=>setStock(e.target.value)}/>
            </div>

            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Price</h3></label>
                <input type="text" className='form-control border-5 ' placeholder="Enter the Product Price" onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Discription</h3></label>
                <input type="text" className='form-control border-5 ' placeholder="Enter the Product Description" onChange={(e)=>setDescription(e.target.value)}/>
            </div>

            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Image</h3></label>
                <input type="file" className='form-control border-5 ' onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="mt-2 ms-5 me-5">
                <button className="btn btn-success form-control" onClick={handleAddProduct}>Add Product</button>
                <Link className="btn btn-danger form-control mt-2" to={'/admin'}>Back To Dashboard</Link>
            </div>

        </div>
    )
}

export default AddProduct