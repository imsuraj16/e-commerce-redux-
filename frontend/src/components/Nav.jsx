import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [loginDropDown, setLoginDropDown] = useState(false);

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
      <div  className="flex gap-[3rem] items-center justify-between ">
        <div
          
         onMouseLeave={() => setLoginDropDown(false)}
          className="relative"
        >
          <h1 onMouseEnter={() => setLoginDropDown(true)}>Profile</h1>
          {loginDropDown && (
          <div className="w-[10rem] h-[5rem] bg-white p-2 absolute left-1/2 -translate-x-1/2">
              <NavLink className="block border-2 border-gray-300" to="/login">
                Login/Signup
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/cart">Bag</NavLink>
      </div>
    </div>
  );
};

export default Nav;

