import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../service/cartService";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const handleAddToCart=async(product)=>{
    const productId=product.id
    const quantity=1
    const cartItem={
      productId,quantity
    }
    try {
      await addToCart(cartItem);
      alert("added to cart..!")
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer"
      >
      
        <div className="h-56 bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-5">

          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full mb-3">
            {product.category}
          </span>

          <h2 className="text-xl font-bold text-gray-800 line-clamp-1 hover:text-blue-600 transition">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-5">
            <div>
              <p className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </p>

              <p
                className={`text-sm font-medium ${
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="p-5 pt-0">

        

        <button
        onClick={()=>{handleAddToCart(product)}}
          className="w-full mt-3 bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;