import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";

const Nav = () => {
  const [loginDropDown, setLoginDropDown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-between items-center px-[3rem] py-[2rem]">
      <div className="w-[60rem] flex gap-[5rem] items-center">
        <NavLink to="/">E-commerce</NavLink>
        <input
          className="w-full border-2 border-gray-200 outline-none px-[1.2rem] py-2"
          type="text"
          placeholder="search for products..."
        />
      </div>

      <div className="flex  gap-[3rem] items-center justify-between">
        {user && user?.isAdmin && (
          <>
            <NavLink>Your listings</NavLink>
            <NavLink to='/admin/add-product'>Add Product</NavLink>
          </>
        )}

        <div onMouseLeave={() => setLoginDropDown(false)} className="relative">
          <h1 className="" onMouseEnter={() => setLoginDropDown(true)}>
            Profile
          </h1>
          {loginDropDown && (
            <div className="w-[10rem] bg-white p-2 absolute left-1/2 -translate-x-1/2">
              <NavLink className="block border-2 border-gray-300" to="/login">
                Login/Signup
              </NavLink>
              <NavLink
                className="block border-2 border-gray-300"
                to="/admin-register"
              >
                Become a Admin
              </NavLink>
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </div>
          )}
        </div>

        <NavLink to="/cart">Bag</NavLink>
      </div>
    </div>
  );
};

export default Nav;
