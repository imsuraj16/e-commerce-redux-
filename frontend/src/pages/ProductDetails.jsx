import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/apiconfig";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items || []);

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product?.id);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Product fetch error:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToCartHandler = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
     dispatch(addToCart(user, { ...product, quantity }));
      setAddedToCart(true);
      
      // Reset the success state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate('/')}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <span>›</span>
          <span className="capitalize">{product.category}</span>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                {product.url ? (
                  <img
                    src={product.url}
                    alt={product.title || 'Product image'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ display: product.url ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full capitalize shadow-lg">
                  {product.category || 'Uncategorized'}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 capitalize leading-tight">
                  {product.title || 'Untitled Product'}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-green-600">
                    ₹{product.price?.toLocaleString() || '0'}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                {!user ? (
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-gray-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login to Add to Cart</span>
                  </button>
                ) : isInCart ? (
                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View in Cart</span>
                  </button>
                ) : (
                  <button
                    onClick={addToCartHandler}
                    disabled={addingToCart}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                      addedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } ${addingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Adding to Cart...</span>
                      </>
                    ) : addedToCart ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 13m0 0l2.5 5M9 21a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                )}

                {/* Contact Seller Button */}
                <button
                  onClick={() => {
                    // You can implement contact seller functionality here
                    console.log('Contact seller for product:', product.id);
                  }}
                  className="w-full bg-gray-100 text-gray-800 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact Seller</span>
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-medium">#{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{product.category || 'Uncategorized'}</span>
                  </div>
                  {product.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed on:</span>
                      <span className="font-medium">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;