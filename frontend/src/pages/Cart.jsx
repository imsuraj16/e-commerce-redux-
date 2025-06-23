import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementCart, incrementCart} from '../store/actions/cartActions';

const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const cart = user?.cart || [];
  const dispatch = useDispatch()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          No items in cart. <br />
          <Link to="/" className="text-blue-600 hover:underline">Go to Products</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.productid}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.producturl}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-lg font-semibold">Product ID: {item.productid}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Quantity buttons (optional for next step) */}
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decrementCart(user, item.productid))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <button onClick={()=>dispatch(incrementCart(user, item.productid))} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
