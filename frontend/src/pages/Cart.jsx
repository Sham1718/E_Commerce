import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { clearCart, fetchCart, removeCartItem, updateCartItem } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, loading, actionLoading, error } = useSelector((state) => state.cart);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const onIncrease = useCallback(
    async (item) => {
      try {
        await dispatch(updateCartItem({ productId: item.productId, quantity: item.quantity + 1 })).unwrap();
        toast.success("Cart Updated");
      } catch (err) {
        toast.error(err);
      }
    },
    [dispatch],
  );

  const onDecrease = useCallback(
    async (item) => {
      if (item.quantity <= 1) {
        setConfirmation({ type: "item", item });
        return;
      }

      try {
        await dispatch(updateCartItem({ productId: item.productId, quantity: item.quantity - 1 })).unwrap();
        toast.success("Cart Updated");
      } catch (err) {
        toast.error(err);
      }
    },
    [dispatch],
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (confirmation?.type === "cart") {
        await dispatch(clearCart()).unwrap();
        toast.success("Cart Cleared");
      } else if (confirmation?.item) {
        await dispatch(removeCartItem(confirmation.item.productId)).unwrap();
        toast.success("Removed from Cart");
      }
      setConfirmation(null);
    } catch (err) {
      toast.error(err);
    }
  }, [confirmation, dispatch]);

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="mt-2 text-slate-500">{items.length} item(s) in your cart</p>
          </div>

          <Button
            variant="danger"
            onClick={() => setConfirmation({ type: "cart" })}
            disabled={items.length === 0 || actionLoading}
          >
            Clear Cart
          </Button>
        </div>

        {error && <ErrorMessage error={error} title="Cart error" onRetry={() => dispatch(fetchCart())} />}
        {loading && <Spinner label="Loading cart..." className="py-20" />}

        {!loading && items.length === 0 && !error ? (
          <EmptyState
            icon="🛒"
            title="Cart is Empty"
            message="Add products to start shopping."
            actionLabel="Browse Products"
            onAction={() => navigate("/")}
          />
        ) : (
          !loading && (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={(cartItem) => setConfirmation({ type: "item", item: cartItem })}
                    loading={actionLoading}
                  />
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Grand Total</h2>
                  <p className="text-slate-500">Total amount payable</p>
                </div>

                <div className="sm:text-right">
                  <p className="text-4xl font-bold text-green-700">₹{total.toFixed(2)}</p>
                  <Button variant="dark" className="mt-4" disabled={items.length === 0}>
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )
        )}
      </div>

      <ConfirmationModal
        open={Boolean(confirmation)}
        title="Are you sure?"
        message={confirmation?.type === "cart" ? "This will remove every item from your cart." : "This item will be removed from your cart."}
        confirmLabel="Delete"
        isLoading={actionLoading}
        onCancel={() => setConfirmation(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
};

export default React.memo(Cart);
