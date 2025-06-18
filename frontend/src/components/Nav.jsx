import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";

const Nav = () => {
  const [loginDropDown, setLoginDropDown] = useState(false);
  const timeoutRef = useRef(null); //  Delay handler
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Mouse enter => show immediately
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setLoginDropDown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLoginDropDown(false);
    }, 200);
  };

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

      <div className="flex gap-[3rem] items-center justify-between">
        {user && user?.isAdmin && (
          <>
            <NavLink to={`/admin/${user.id}/listings`}>Your listings</NavLink>
            <NavLink to="/admin/add-product">Add Product</NavLink>
          </>
        )}

        {/*  Wrapping dropdown logic with mouseEnter + mouseLeave */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="cursor-pointer">Profile</h1>

          {loginDropDown && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[12rem] bg-white p-2 shadow-lg rounded-md z-10">
              {!user && (
                <>
                  <NavLink
                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                    to="/login"
                  >
                    Login/Signup
                  </NavLink>
                </>
              )}

              {user && !user.isAdmin && (
                <NavLink
                  className="block px-4 py-2 hover:bg-gray-100"
                  to="/admin-register"
                >
                  Become an Admin
                </NavLink>
              )}
              {user && (
                <>
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => navigate("/Profile")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Your Profile
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <NavLink to="/cart">Bag</NavLink>
      </div>
    </div>
  );
};

export default Nav;
