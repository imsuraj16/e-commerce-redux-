import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiconfig";

const ProductDetails = () => {
  const { id } = useParams();
  const [product,setProducts] = useState(null)
  

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProducts(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);



  if (!product) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-lg border flex flex-col md:flex-row gap-6">
        
      <img
        src={product.url}
        alt={product.title}
        className="w-full md:w-[300px] h-[300px] object-cover rounded-xl"
      />

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold capitalize">{product.title}</h1>
        <p className="text-gray-500 capitalize">{product.category}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600">₹ {product.price}</p>

        <div className="mt-4">
          <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
