import React, { useEffect, useState }  from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Products = ({setPrev,setNext}) => {
  const productsRedux=useSelector((state)=>state.product.products);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Our Products
        </h2>

        <p className="text-gray-500 mt-2">
          Browse our latest collection.
        </p>
      </div>

      {productsRedux.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No Products Available
          </h2>

          <p className="text-gray-500 mt-2">
            Add a product to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsRedux.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
      <button onClick={()=>setPrev()}>prev</button>
      <button onClick={()=>setNext()}>next</button>
    </div>
  );
};

export default Products;