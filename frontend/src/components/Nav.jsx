import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";
import { Search, ShoppingBag, User, ChevronDown, Package, Plus, LogOut, UserCog, Crown } from "lucide-react";

const Nav = () => {
  const [loginDropDown, setLoginDropDown] = useState(false);
  const timeoutRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mouse enter => show immediately
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setLoginDropDown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLoginDropDown(false);
    }, 200);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setLoginDropDown(false);
  };

  const handleProfileClick = () => {
    navigate("/Profile");
    setLoginDropDown(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Search */}
          <div className="flex items-center flex-1 max-w-4xl">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mr-8 whitespace-nowrap"
            >
              E-commerce
            </NavLink>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                type="text"
                placeholder="Search for products..."
              />
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Admin Links */}
            {user && user?.isAdmin && (
              <div className="hidden md:flex items-center space-x-4">
                <NavLink 
                  to={`/admin/${user.id}/listings`}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Package className="h-4 w-4" />
                  <span>Your Listings</span>
                </NavLink>
                
                <NavLink 
                  to="/admin/add-product"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </NavLink>
              </div>
            )}

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                <User className="h-4 w-4" />
                <span>Profile</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${loginDropDown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {loginDropDown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {!user && (
                      <NavLink
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        to="/login"
                        onClick={() => setLoginDropDown(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Login / Signup
                      </NavLink>
                    )}

                    {user && !user.isAdmin && (
                      <NavLink
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        to="/admin-register"
                        onClick={() => setLoginDropDown(false)}
                      >
                        <Crown className="h-4 w-4 mr-3" />
                        Become an Admin
                      </NavLink>
                    )}

                    {user && (
                      <>
                        <button
                          onClick={handleProfileClick}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <UserCog className="h-4 w-4 mr-3" />
                          Your Profile
                        </button>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Link */}
            <NavLink 
              to="/cart"
              className={({ isActive }) =>
                `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Cart</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Admin Links (visible on smaller screens) */}
      {user && user?.isAdmin && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-2 space-y-1">
            <NavLink 
              to={`/admin/${user.id}/listings`}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                }`
              }
            >
              <Package className="h-4 w-4" />
              <span>Your Listings</span>
            </NavLink>
            
            <NavLink 
              to="/admin/add-product"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                }`
              }
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;