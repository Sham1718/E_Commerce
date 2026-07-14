import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById,deleteProduct } from "../service/productService";
import { addToCart } from "../service/cartService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleAddToCart=async()=>{
    const productId=id;
    const quantity=1;
    try {
      const item ={
        productId,
        quantity
      }
      await addToCart(item);
      alert("added to cart..!");
    } catch (error) {
      
    }
  }

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onDelete=async()=>{
    try {
      await deleteProduct(id);
      alert("product deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Product...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

      <div className="grid lg:grid-cols-2">

        {/* Image Section */}

        <div className="bg-gray-50 flex justify-center items-center p-10">

          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-112.5 object-contain rounded-xl"
          />

        </div>

        {/* Details Section */}

        <div className="p-10">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-800 mt-5">
            {product.name}
          </h1>

          {/* Price & Stock */}

          <div className="grid grid-cols-2 gap-5 mt-8">

            <div className="bg-green-50 rounded-xl p-5 border">

              <p className="text-gray-500 text-sm">
                Price
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                ₹ {product.price}
              </h2>

            </div>

            <div
              className={`rounded-xl p-5 border ${
                product.stock > 0
                  ? "bg-blue-50"
                  : "bg-red-50"
              }`}
            >

              <p className="text-gray-500 text-sm">
                Stock
              </p>

              <h2
                className={`text-2xl font-bold ${
                  product.stock > 0
                    ? "text-blue-700"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} Available`
                  : "Out Of Stock"}
              </h2>

            </div>

          </div>

          {/* Description */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Description
            </h3>

            <div className="bg-gray-50 border rounded-xl p-5 leading-8 text-gray-700">
              {product.description}
            </div>

          </div>

          {/* Extra Information */}

          <div className="grid grid-cols-2 gap-5 mt-8">

            <div className="bg-gray-50 border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Product ID
              </p>

              <p className="font-semibold">
                #{product.id}
              </p>
            </div>

            {product.createdAt && (
              <div className="bg-gray-50 border rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Added On
                </p>

                <p className="font-semibold">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}

          </div>

          {/* Buttons */}

          <div className="grid grid-cols-2 gap-4 mt-10">

            <button
              onClick={handleAddToCart}
              className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
            >
              Add To Cart
            </button>

            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Edit
            </button>

            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Delete
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Back
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default ProductDetails;