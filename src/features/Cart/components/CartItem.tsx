import React from "react";
import type { CartItem } from "../types/cartItem";
// import type { CartItem } from "../types/cart";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const total = item.price * item.quantity;

  return (
    <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100 last:border-0">
      <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium text-gray-800">{item.title}</h4>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 text-sm mt-1 hover:text-red-700 flex items-center"
          >
            🗑 Remove
          </button>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 text-gray-700 text-center mb-4 md:mb-0">
        ${item.price.toFixed(2)}
      </div>

      <div className="col-span-4 md:col-span-3 flex items-center justify-center mb-4 md:mb-0">
        <button
          onClick={() => onQuantityChange(item.id, -1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => onQuantityChange(item.id, 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="col-span-4 md:col-span-2 text-right font-medium">
        ${total.toFixed(2)}
      </div>
    </div>
  );
};
