import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const product = useSelector((state) => state.product.products);

  return product && product.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {product.map((p) => (
        <Link to={`/products/${p.id}`}
          key={p.id}
          className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300"
        >
          <img
            src={p.url}
            alt={p.title}
            className="w-full h-[200px] object-contain mb-4"
          />
          <h2 className="text-lg font-semibold">{p.title}</h2>
          <p className="text-gray-600 text-sm my-2 line-clamp-2">
            {p.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-blue-600">${p.price}</span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-[3rem] text-center mt-20">Loading...</div>
  );
};

export default Home;
