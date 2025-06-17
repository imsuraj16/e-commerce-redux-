import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import UserRegister from "../pages/UserRegister"
import Adminregister from '../pages/admin/Adminregister'
import Addproducts from '../pages/admin/Addproducts'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/user-register' element = {<UserRegister/>} />
      <Route path='/admin-register' element = {<Adminregister/>}/>


  <Route path='/admin/add-product' element = {<Addproducts/>}/>

    </Routes>
  )
}

export default Mainroutes
