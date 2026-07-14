import { useEffect, useEffectEvent, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoute from './routes/AppRoute'
import { searchProducts,getProductsByCategory } from './service/productService'
import { getAllProducts } from './service/productService'

function App() {
   const [search,setSearch]=useState("");
  const [category,setCategory]=useState("");
  const[products,setProducts]=useState([]);
  const loadProducts=async()=>{
    try {
      const res=await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSerach=async()=>{
    try {
      if(search.trim()!== ""){
        const res =await searchProducts(search);
        setProducts(res.data);
        console.log(products)
        return;
      }
      const res=await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleCategory = async (value) => {
    setCategory(value);
    console.log(value);

    if (value === "") {
        const res = await getAllProducts();
        setProducts(res.data);
        
    } else {
        const res = await getProductsByCategory(value);
        setProducts(res.data);
        console.log(res.data);

    }
}; 
  useEffect(()=>{
    loadProducts();
  },[])
  return (

    <>
    <Navbar search={search} setSearch={setSearch} category={category}
     setCategory={setCategory} handleSearch={handleSerach} handleCategory={handleCategory}/>
    <AppRoute products={products}/>
    <Footer/>
    </>
  )
}

export default App
