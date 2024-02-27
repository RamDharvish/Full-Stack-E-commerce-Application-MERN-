import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [products,setProducts]=useState([])
  const [searchItem, setSearchItem] = useState('')
  const navigate=useNavigate()

  useEffect(()=> {
    axios.get('http://localhost:5000/visitors/products')
    .then(res => setProducts(res.data))
    .catch(err =>console.log(err))
  },[])

  let filteredProducts=products.filter((product)=> {
    let searchProduct=searchItem.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchProduct),
      product.description.toLowerCase().includes(searchProduct)

    )
  })
  const loginFirst=()=> {
     let result = window.confirm("login before buying a product")
      if(result) {
        navigate('/login')
      }else {
        navigate('/')


      }
  }
  return (
    <div>
        <div className="">
            <Navbar setSearchItem={setSearchItem}/>
        </div>
        <div className="row home">
         {
          filteredProducts.map((product,index)=>(
        <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 items" key={index}>
          <div className="card mt-5">
            <div className="card-top d-flex justify-content-center align-items-center ">
              <img src={`http://localhost:5000/${product.image}`} alt="" width={"80%"} height={"80%"}/>
            </div>
            <div className="content">
              <h3 className='d-flex justify-content-center '>{product.name}</h3>
              <h5 className='ms-3 d-flex justify-content-center description'>{product.description}</h5>
              <p className={product.stock<100?"text-danger fw-bold d-flex justify-content-center align-items-center":"text-success fw-bold d-flex justify-content-center align-items-center"}>{product.stock} stock left !</p>
             <h5  className='d-flex justify-content-center fw-bold'>{product.price}</h5>
            <button className='btn btn-success form-control' onClick={loginFirst}>Add To Cart</button>
                       
            </div>
          </div>
        </div>
        ))
         }
      </div>
    </div>
  )
}

export default Home