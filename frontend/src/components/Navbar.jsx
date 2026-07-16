import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPage, setSearch } from "../redux/productSlice";
import Button from "./Button";

const categories = ["Electronics", "Fashion", "Books", "Furniture", "Sports"];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, category, loading } = useSelector((state) => state.product);
  const cartCount = useSelector((state) => state.cart.items.reduce((total, item) => total + Number(item.quantity || 0), 0));

  const handleSearchChange = useCallback(
    (event) => {
      dispatch(setSearch(event.target.value));
      dispatch(setPage(0));
    },
    [dispatch],
  );

  const handleCategoryChange = useCallback(
    (event) => {
      dispatch(setCategory(event.target.value));
      dispatch(setPage(0));
    },
    [dispatch],
  );

  const handleLogoClick = useCallback(() => {
    dispatch(setSearch(""));
    dispatch(setCategory(""));
    dispatch(setPage(0));
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <button type="button" onClick={handleLogoClick} className="text-left">
          <h1 className="text-3xl font-bold text-slate-900">
            Shop<span className="text-blue-600">Sphere</span>
          </h1>
        </button>

        <div className="flex w-full flex-col gap-3 md:flex-row lg:max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {loading && search.trim() && (
              <span className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
            )}
          </div>

          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="success" onClick={() => navigate("/add")}>
            + Add Product
          </Button>
          <Button variant="dark" onClick={() => navigate("/cart")}>
            Cart ({cartCount})
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
