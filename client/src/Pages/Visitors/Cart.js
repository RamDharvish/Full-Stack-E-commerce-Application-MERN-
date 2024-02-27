import React, { useEffect, useState } from 'react'
import VisitorNav from '../../Components/Navbar/VisitorNav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import StripeCheckout from 'react-stripe-checkout';

function Cart() {
  const [input, setInput] = useState(false)
  const [cartItems,setCartItems]=useState([])
  const [itemCounts, setItemCounts] = useState({});

 const {id}=useParams()
    useEffect(()=> {
 axios.get(`http://localhost:5000/visitors/getCartItems/${id}`)
 .then(res=>{
    setCartItems(res.data.cart)
    const initialCounts = {};
        res.data.cart.forEach(item => {
          initialCounts[item._id] = 1;
        });
        setItemCounts(initialCounts);
       
 }).catch(err =>console.log(err))
    },[id])

    const handleAdd = (itemId, stock) => {
        setItemCounts((prevCounts) => {
          const currentCount = (prevCounts[itemId] || 0) + 1;
        
          if (currentCount <= stock) {
            return {
              ...prevCounts,
              [itemId]: currentCount,
            };
          } else {
          
            alert(`Cannot add more than ${stock} `);
            return prevCounts; 
          }
        });
      };
      

      const handleLess = (itemId) => {
        if (itemCounts[itemId] > 1) {
          setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: prevCounts[itemId] - 1
          }));
        }
      };

    const removeFromCart=(productId)=> {
     axios.delete(`http://localhost:5000/visitors/removeFromCart/${id}/${productId}`)
     .then(res =>{
        window.location.reload()
        console.log(res.data.result)
     })
     .catch(err =>console.log(err))
    }

    const purchase= async(productId,token,totalAmount,stock)=> {
      await  axios.post(`http://localhost:5000/visitors/payment/${id}`,{token,productId,totalAmount,stock})
        .then(res => {
          console.log(res)
          addToOrders(id,productId,totalAmount,stock)
        removeFromCart(productId)
        })
        .catch(err =>console.log(err))
      
    }
    const addToOrders=async(id,productId,totalAmount,stock)=> {
   await axios.post(`http://localhost:5000/visitors/addToOrders/${id}`,{productId,stock,totalAmount})
    .then(res =>console.log(res))
    .catch(err =>console.log("eeee",err))
    }
  return (
    <div className='vh-100'> 
        <div>
            <VisitorNav input={input} id={id}/>
        </div>
        <div className='overflow-x-auto overflow-overflow-y-auto container'>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{width:"200px"}}>Image</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Stock Left</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   {
                    cartItems.map((product,index)=> (
                         <tr key={index}>
                        <td style={{height:"190px"}} className='text-center align-middle'><img src={`http://localhost:5000/${product.productId.image}`} width={"100%"} height={"100%"} alt='img'/></td>
                        <td style={{height:"190px"}} className='text-center align-middle'>{product.productId.name}</td>
                        <td style={{height:"190px"}} className='text-center align-middle'>{product.productId.type}</td>
                        <td style={{height:"190px"}} className='text-center align-middle'>{product.productId.description}</td>
                        <td style={{height:"190px"}} className='text-center align-middle'>{product.productId.stock}</td>
                        <td style={{height:"190px"}} className='text-center align-middle'>
                        <h3 className='d-flex justify-content-center '>{product.productId.price * itemCounts[product._id]} </h3>
                        <h5 className='btn btn-success form-control' onClick={()=>handleAdd(product._id,product.productId.stock)}>+</h5>
                        <p className='d-flex justify-content-center'>{itemCounts[product._id]}</p>
                        <h5 className='btn btn-danger form-control' onClick={()=>handleLess(product._id)}>-</h5>
                       
                        </td>
                        <th style={{height:"190px"}} className='d-flex justify-content-center align-items-center '>
                        <StripeCheckout
                          name="Purchase"
                          image={`http://localhost:5000/${product.productId.image}`}
                          description={product.productId.name}
                          amount={product.productId.price * itemCounts[product._id]  *100}
                          currency="INR"
                          stripeKey='pk_test_51OKaveSCKRGDSmMNVY86RbfJ9zu6YTiKhpx7q1PQltFdQLp2aQcliLe1cc3CbmaLO9XuejxuXhzkRvSYMSDxTF0o001HBJcKOP'
                          token={(token  )=>purchase(product.productId._id,token,product.productId.price * itemCounts[product._id],itemCounts[product._id])}
                          // shippingAddress={true}
                         
                        >
                         <button className="form-control bg-primary text-white">Buy Item</button>
                         </StripeCheckout>
                        <MdDelete  className='fs-5 ms-3' onClick={()=>removeFromCart(product._id)}/>
                        </th>
                        </tr>
                    ))
                   }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Cart