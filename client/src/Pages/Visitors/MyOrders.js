import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './style.css'
function MyOrders() {
  const [orders,setOrders]=useState([])
 const {id}=useParams()
  useEffect(()=> {
    axios.get(`http://localhost:5000/visitors/myOrders/${id}`)
    
    .then(res =>{
      console.log(res.data)
      setOrders(res.data.orders)
    })
    .catch(err =>console.log(err))
  },[])
  return (
    <div className='vh-100 d-flex justify-content-center '>
      <div className=" myOrderspage p-3 ">
      <div className='overflow-x-auto overflow-overflow-y-auto'>
        <table className="table  ">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>No.of Items</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(item => {
              return <tr key={item._id} >
                      <td style={{width:"100px"}}><img src={`http://localhost:5000/${item.productId.image}`} width={"100%"} alt="" /></td>
                      <td className='text-center align-middle'>{item.productId.name}</td>
                      <td className='text-center align-middle'>{item.stock}</td>
                      <td className='text-center align-middle'>{item.totalAmount}</td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default MyOrders