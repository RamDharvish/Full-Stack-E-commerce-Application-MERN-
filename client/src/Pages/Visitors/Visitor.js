import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VisitorNav from '../../Components/Navbar/VisitorNav'
import './visitor.css'
function Visitor() {
  const [success, setSuccess] = useState()
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState('')
  const [products,setProducts]=useState([])
  const [input, setInput] = useState(true)
 const [cartItem,setCartITem]=useState([])
 const [category,setCategory]=useState({
  all:"General",
  mobiles:"Mobiles",
  watches:"Watches",
  toys:"Toys",
  mens:"Mens",
  womens:"Womens"
 })
  const {id}=useParams()


  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:5000/account/verifyUser')
      .then(res => {
        if (res.data === "success") {
          setSuccess("success")
        } else {
          navigate('/login')
        }
      }).catch(err => console.log(err))

      axios.get('http://localhost:5000/visitors/products')
      .then(res=>setProducts(res.data))
      .catch(err =>console.log(err))

      axios.get(`http://localhost:5000/visitors/getCartItems/${id}`)
      .then(res=>{
        setCartITem(res.data.cart)
      }).catch(err =>console.log(err))
  }, [])

 

  const addToCart=(productId)=>{
    const userId=id
    console.log(userId)
    axios.put(`http://localhost:5000/visitors/addToCart/${id}`, { productId })
        .then(res => {
          return    axios.get(`http://localhost:5000/visitors/getCartItems/${id}`)
        }).then(res=> setCartITem(res.data.cart))
        .catch(err => console.log(err));

  }
  const categoryProduct = (productCategory) => {
        
    axios.get(`http://localhost:5000/visitors/category/${productCategory}`)
    .then(res =>setProducts(res.data))
    .catch(err=>console.log(err))
  };

  let filteredProducts = products.filter((product) => {
    let searchProduct = searchItem.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchProduct) ||
      product.description.toLowerCase().includes(searchProduct) ||
      product.type.toLowerCase().includes(searchProduct)
    );
  });



  
  return (
    <div className='vh-100 '>
      <div>
        <VisitorNav setSearchItem={setSearchItem} id={id} input={input} cartItem={cartItem}/>
      </div>
      <div id="imageCarousel" className="carousel slide mb-3" data-bs-ride="carousel">
        <div className="carousel-inner">
         
          <div className="carousel-item active">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0c706f11307528da.jpg?q=20" className="d-block w-100" alt="" />
          </div>
        </div>
        </div>
      <div className="row mt-3 categories ms-0">
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.all)}>{category.all}</div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.mobiles)}>{category.mobiles}</div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.watches)}>{category.watches}</div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.toys)}>{category.toys}</div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.mens)}>{category.mens}</div>
        <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-xxl-2 category-items" onClick={()=>categoryProduct(category.womens)}>{category.womens}</div>
      </div>

      <div id="imageCarousel" className="carousel slide mt-3" data-bs-ride="carousel">
        <div className="carousel-inner">
         
          <div className="carousel-item active">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e8afba7feffa58f9.jpg?q=20" className="d-block w-100" alt="" />
          </div>
        </div>
        </div>
      
  
      <div className="row home">
         {
          filteredProducts.map((product,index)=>(
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3 items" key={index}>
          <div className="card mt-5">
            <div className="card-top d-flex justify-content-center align-items-center ">
              <img src={`http://localhost:5000/${product.image}`} alt="" width={"80%"} height={"80%"}/>
            </div>
            <div className="content">
              <h3 className='d-flex justify-content-center '>{product.name}</h3>
              <h5 className='ms-3 d-flex justify-content-center description'>{product.description}</h5>
              <p className={product.stock<100?"text-danger fw-bold d-flex justify-content-center align-items-center":"text-success fw-bold d-flex justify-content-center align-items-center"}>{product.stock} stock left !</p>
             <h5  className='d-flex justify-content-center fw-bold'>{product.price}</h5>
            <button className='btn btn-success form-control' onClick={()=>addToCart(product._id)}>Add To Cart</button>
                       
            </div>
          </div>
        </div>
        ))
         }
      </div>
    </div>
  )
}

export default Visitor