import axios from "../../api/apiconfig";
import { loadProducts } from "../reducers/productReducer";


export const fetchProducts = ()=>async(dispatch)=>{

    try {

        const {data} = await axios.get("/products")
        dispatch(loadProducts(data))
        
        
    } catch (error) {
        console.log(error);
        
    }
}





export const addProduct = (product) => async (dispatch) => {
  try {
    const { data } = await axios.post("/products", product);
    dispatch(fetchProducts())
    
  } catch (error) {
    console.log(error);
  }
};
