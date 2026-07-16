import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/cartSlice";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actionLoading = useSelector((state) => state.cart.actionLoading);
  const inStock = Number(product.stock) > 0;

  const handleAddToCart = useCallback(async () => {
    try {
      await dispatch(addCartItem(product.id)).unwrap();
      toast.success("Added to Cart");
    } catch (error) {
      toast.error(error);
    }
  }, [dispatch, product.id]);

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <button type="button" onClick={() => navigate(`/product/${product.id}`)} className="block w-full text-left">
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-700 shadow">
            {product.category}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 shadow">
            Deal
          </span>
        </div>

        <div className="p-5">
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
            {product.name}
          </h2>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{product.description}</p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-green-700">₹{product.price}</p>
              <p className={`mt-1 text-sm font-semibold ${inStock ? "text-green-700" : "text-red-600"}`}>
                {inStock ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {inStock ? "Available" : "Sold out"}
            </span>
          </div>
        </div>
      </button>

      <div className="p-5 pt-0">
        <Button
          variant="dark"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!inStock}
          isLoading={actionLoading}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
