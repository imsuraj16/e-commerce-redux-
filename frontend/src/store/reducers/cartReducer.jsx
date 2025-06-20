import {createSlice} from "@reduxjs/toolkit"


const initialState = {

    cart : []
}



const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        loadCart : (state,action)=>{
            state.cart = action.payload
        },
        clearCart : (state,action)=>{
            state.cart = action.payload
        }
    }
})

export default cartSlice.reducer
export const {loadCart,clearCart} = cartSlice.actions