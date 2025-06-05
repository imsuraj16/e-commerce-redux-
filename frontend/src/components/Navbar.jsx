import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex items-center gap-[3rem] justify-center px-[3rem] py-[1.7rem]'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default Navbar
