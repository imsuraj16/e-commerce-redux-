import axios from "../../api/apiconfig";
import { loadProducts } from "../reducers/productReducer";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadProducts(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);
    dispatch(fetchProducts());
  } catch (error) {
    console.log("Delete error", error);
  }
};

export const editProduct = (productdetails) => async (dispatch) => {
console.log(productdetails);

  try {
    await axios.patch(`/products/${productdetails.id}`, productdetails);
  
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    await axios.post("/products", product);
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
  }
};
