import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'

const AppRoute = ({products,setPrev,setNext}) => {
  return (
   
   <Routes>
    <Route path='/'  element={<Home  setNext={setNext} setPrev={setPrev} />}/>
    <Route path='/add' element={<AddProduct/>}/>
    <Route path='/edit/:id' element={<EditProduct/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
   </Routes>
   
  )
}

export default AppRoute
