import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import UserRegister from "../pages/UserRegister"
import Adminregister from '../pages/admin/Adminregister'
import Addproducts from '../pages/admin/Addproducts'
import AdminListings from '../pages/admin/AdminListings'
import ProductDetails from '../pages/ProductDetails'
import AdminProductDetails from '../pages/admin/AdminProductDetails'
import UserProfile from '../pages/UserProfile'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/products/:id' element = {<ProductDetails/>} />
      <Route path='/user-register' element = {<UserRegister/>} />
      <Route path='/admin-register' element = {<Adminregister/>}/>
      <Route path='/Profile' element = {<UserProfile/>}/>


  <Route path='/admin/add-product' element = {<Addproducts/>}/>
  <Route path='/admin/:id/listings' element = {<AdminListings/>}/>
  <Route path='/admin/product/:id' element = {<AdminProductDetails/>}/>

    </Routes>
  )
}

export default Mainroutes
