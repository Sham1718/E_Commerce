import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import {
  getCartItems,
  updateCart,
  deleteCartItem,
  deleteCart,
  getCartTotal,
} from "../service/cartService";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await getCartItems();
      setProducts(response.data);

      const res = await getCartTotal();
      setTotal(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const onIncrease = async (item) => {
    try {
      await updateCart(item.productId, {
        productId: item.productId,
        quantity: item.quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const onDecrease = async (item) => {
    try {
      if (item.quantity <= 1) {
        await deleteCartItem(item.productId);
      } else {
        await updateCart(item.productId, {
          productId: item.productId,
          quantity: item.quantity - 1,
        });
      }

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await deleteCartItem(item.productId);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      await deleteCart();
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-6xl mx-auto px-5">

        {/* Heading */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-2">
              {products.length} item(s) in your cart
            </p>
          </div>

          <button
            onClick={handleDeleteCart}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
          >
            Clear Cart
          </button>

        </div>

        {/* Empty Cart */}

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">

            <h2 className="text-3xl font-semibold text-gray-700">
              🛒 Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-4">
              Add products to start shopping.
            </p>

          </div>
        ) : (
          <>
            <div className="space-y-6">

              {products.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={handleRemove}
                />
              ))}

            </div>

            {/* Order Summary */}

            <div className="mt-10 bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold">
                  Grand Total
                </h2>

                <p className="text-gray-500">
                  Total Amount Payable
                </p>
              </div>

              <div className="text-right">

                <p className="text-4xl font-bold text-green-600">
                  ₹ {total.toFixed(2)}
                </p>

                <button
                  className="mt-4 bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg"
                >
                  Checkout
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Cart;