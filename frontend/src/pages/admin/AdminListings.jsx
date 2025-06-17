import axios from "../../api/apiconfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminListings = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [adminProducts, setAdminProducts] = useState([]);

  const fetchProducta = async () => {
    try {
      const { data } = await axios.get(`/products`);
      const product = data.filter((p) => p.ownerId === id);
      setAdminProducts(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducta();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {adminProducts.map((p) => (
        <div
          key={p.id}
          className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        >
          <img src={p.url} alt={p.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-1 capitalize">{p.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{p.category}</p>
            <p className="text-sm text-gray-700 mb-3">{p.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">
                ₹ {p.price}
              </span>
              <button onClick={()=>navigate(`/admin/product/${p.id}`)}  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm">
                view Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminListings;
