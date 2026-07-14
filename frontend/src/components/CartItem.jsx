import React from "react";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {

  // console.log(item)
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition">

      {/* Product Image */}
      <div className="w-36 h-36 shrink-0">
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 w-full">

        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {item.category}
        </span>

        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          {item.productName}
        </h2>

        <p className="text-gray-500 mt-2">
          ₹ {item.price}
        </p>

        <p className="text-lg font-semibold text-green-600 mt-2">
          Total : ₹ {(item.price * item.quantity).toFixed(2)}
        </p>

      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col items-center gap-4">

        <div className="flex items-center border rounded-lg overflow-hidden">

          <button
            onClick={() => onDecrease(item)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xl"
          >
            −
          </button>

          <span className="px-5 font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xl"
          >
            +
          </button>

        </div>

        <button
          onClick={() => onRemove(item)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Remove
        </button>

      </div>

    </div>
  );
};

export default CartItem;