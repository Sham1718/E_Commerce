import React, { useEffect, useState }  from "react";
import { getAllProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";

const Products = ({products,setPrev,setNext}) => {
  // const [products, setProducts] = useState([]);

  // const productList = async () => {
  //   try {
  //     const response = await getAllProducts();
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   productList();
  // }, []);

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

      {products.length === 0 ? (
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
          {products.map((product) => (
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