import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../service/productService'
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products,setProducts]=useState([]);

  const productList=async()=>{
    try {
      const responce=await getAllProducts();
      setProducts(responce.data);
      console.log(responce.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    productList()
  },[])
  return (
    <div className="max-w-7xl mx-auto p-8">product
      {
        products.map(product=>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={product.id}>
          <ProductCard product={product}/>
          </div>
        )
      }
      
    </div>
  )
}

export default Products
