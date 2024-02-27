import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Visitor from './Pages/Visitors/Visitor'
import Admin from './Admin/Admin'
import ForgotPassword from './Auth/forgotPassword'
import AddProduct from './Admin/AddProduct'
import UpdateProduct from './Admin/UpdateProduct'
import ViewProduct from './Admin/ViewProduct'
import Cart from './Pages/Visitors/Cart'
import UserProfile from './Pages/Visitors/UserProfile'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/visitor/:id' element={<Visitor/>} />
      <Route path='/visitor/cart/:id' element={<Cart/>} />
      <Route path='/visitor/userProfile/:id' element={<UserProfile/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/admin/addProducts' element={<AddProduct/>} />
      <Route path='/admin/viewProduct/:id' element={<ViewProduct/>} />
      <Route path='/admin/updateProduct/:id' element={<UpdateProduct/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App