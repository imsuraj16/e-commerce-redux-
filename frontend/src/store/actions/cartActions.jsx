import axios from "../../api/apiconfig";
import { loadCart } from "../reducers/cartReducer";


export const cart = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/cart?userId=${userId}&productId=${productId}`);
    
    if (data.length > 0) {
      const existingItem = data[0];
      await axios.patch(`/cart/${existingItem.id}`, {
        quantity: existingItem.quantity + 1,
      });
    } else {
      await axios.post(`/cart`, { userId, productId, quantity: 1 });
    }

    dispatch(fetchCart()); // ✅ Pass userId for proper fetch
  } catch (err) {
    console.log("Cart API error:", err);
  }
};

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/cart?userId=${userId}`);
    dispatch(loadCart(data));
  } catch (err) {
    console.log("Fetch cart error:", err);
  }
};
