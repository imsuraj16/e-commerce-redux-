import axios from "../../api/apiconfig";
import { currentUser } from "./userActions";

export const addToCart = (user, product) => async (dispatch) => {
  try {
    const existing = user.cart.find((item) => item.productid === product.id);

    let updateCart;

    if (existing)
      updateCart = user.cart.map((item) =>
        item.productid === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    else {
      updateCart = [
        ...user.cart,
        { productid: product.id, producturl: product.url, quantity: 1 },
      ];
    }

    let {data} = await axios.patch(`/users/${user.id}`, { cart: updateCart });
    
    
    
    localStorage.setItem('user',JSON.stringify(data))
    dispatch(currentUser())

  } catch (error) {
    console.log(error);
  }
};  




export const incrementCart = (user,productid)=> async(dispatch)=>{

  let updateCart = user.cart.map((item)=>item.productid===productid ? {...item,quantity : item.quantity + 1} : item)

  let {data} = await axios.patch(`/users/${user.id}`,{cart : updateCart})
  localStorage.setItem("user",JSON.stringify(data))
  
dispatch(currentUser())

}
export const decrementCart = (user,productid)=> async(dispatch)=>{

  let updateCart = user.cart.map((item)=>item.productid===productid ? {...item,quantity : item.quantity - 1} : item).filter(item=>item.quantity>0)

  let {data} = await axios.patch(`/users/${user.id}`,{cart : updateCart})
  localStorage.setItem("user",JSON.stringify(data))
  
dispatch(currentUser())

}