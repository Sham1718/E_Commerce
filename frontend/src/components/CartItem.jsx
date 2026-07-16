import React from "react";
import Button from "./Button";

const CartItem = ({ item, onIncrease, onDecrease, onRemove, loading = false }) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center">
      <div className="h-36 w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 md:w-36">
        <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          {item.category}
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">{item.productName}</h2>
        <p className="mt-2 text-slate-500">₹{item.price}</p>
        <p className="mt-2 text-lg font-bold text-green-700">
          Total: ₹{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 md:items-center">
        <div className="flex overflow-hidden rounded-lg border border-slate-300">
          <button
            type="button"
            onClick={() => onDecrease(item)}
            disabled={loading}
            className="h-11 w-11 bg-slate-100 text-xl font-bold transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            -
          </button>
          <span className="flex h-11 w-14 items-center justify-center font-bold">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onIncrease(item)}
            disabled={loading}
            className="h-11 w-11 bg-slate-100 text-xl font-bold transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            +
          </button>
        </div>

        <Button variant="danger" onClick={() => onRemove(item)} disabled={loading}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
