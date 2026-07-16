import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch ,setCategory} from "../redux/productSlice";

const Navbar = ({
  handleSearch,
  handleCategory
}) => {
  
  const search=useSelector((state)=>state.product.search);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const category=useSelector((state)=>state.product.category);
  // console.log(search);
  // console.log(category);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-bold text-slate-800">
            Shop<span className="text-blue-600">Sphere</span>
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-1/2">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>dispatch( setSearch(e.target.value))}
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Search
          </button>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <select
            value={category}
            onChange={(e) =>{ dispatch(setCategory(e.target.value)); handleCategory(e.target.value) }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports">Sports</option>
          </select>

          <button
            onClick={() => navigate("/add")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-lg font-medium transition"
          >
            🛒 Cart
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;