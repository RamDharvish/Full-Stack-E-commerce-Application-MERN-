import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function UpdateProduct() {
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
            setImage(res.data.image)
        }).catch(err =>console.log(err))
    },[id])

    const handleUpdateProduct=()=> {
      const formData=new FormData()
      formData.append("name",name)
      formData.append("type",type)
      formData.append("stock",stock)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("image",image)
      axios.put(`http://localhost:5000/products/updateProduct/${id}`,formData)
      .then(res=>navigate('/admin'))
      .catch(err =>console.log(err))
    }
    return (
        <div className=''>
            <div className="d-flex justify-content-center">
                <h1>UPDATE PRODUCT</h1>
            </div>
            
            <div className="mt-3 ms-5 me-5">
                <label><h3>Product Name</h3></label>
                <input type="text" className='form-control border-5' placeholder="Enter the Product Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mt-3 ms-5 me-5">
                <label><h3>Product Type</h3></label>
                <select className='form-control border-5' onChange={(e)=>setType(e.target.value)} >
                    <option >{type}</option>
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
                <input type="number" className='form-control border-5 ' placeholder="Amount Of Stock" value={stock} onChange={(e)=>setStock(e.target.value)}/>
            </div>

            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Price</h3></label>
                <input type="text" className='form-control border-5 ' placeholder="Enter the Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Discription</h3></label>
                <input type="text" className='form-control border-5 ' placeholder="Enter the Product Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>

            <div className="mt-2 ms-5 me-5">
                <label><h3>Product Image</h3></label>
                <input type="file" className='form-control border-5 ' onChange={(e)=>setImage(e.target.files[0])}/>
                <img src={`http://localhost:5000/${image}`} width={"500Px"} height={"200px"} alt="" />
            </div>
            <div className="mt-2 ms-5 me-5">
                <button className="btn btn-success form-control" onClick={handleUpdateProduct}>Update Product</button>
                <Link className="btn btn-danger form-control mt-2" to={'/admin'}>Back To Dashboard</Link>
            </div>
        </div>
    )
}



export default UpdateProduct