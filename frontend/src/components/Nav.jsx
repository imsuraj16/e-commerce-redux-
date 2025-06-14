import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full flex justify-between items-center px-[4rem] py-[2rem]">
      <div className="w-full flex gap-[5rem] items-center">
        <NavLink to="/">E-commerce</NavLink>
        <NavLink>cat-1</NavLink>
        <NavLink>cat-2</NavLink>
        <NavLink>cat-3</NavLink>
        <input
          className="w-1/2 border-2 border-gray-200 outline-none px-[1.2rem] py-1.5"
          type="text"
          placeholder="search for products..."
        />
      </div>
      <div className="flex gap-[3rem] items-center justify-between">
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </div>
  );
};

export default Nav;
