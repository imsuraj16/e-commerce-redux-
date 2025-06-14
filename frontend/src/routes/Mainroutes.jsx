import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import UserRegister from "../pages/UserRegister"

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/profile' element = {<Profile/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/user-register' element = {<UserRegister/>} />
    </Routes>
  )
}

export default Mainroutes
