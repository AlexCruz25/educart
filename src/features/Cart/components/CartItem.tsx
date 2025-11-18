import React from "react";
import type { CartItem } from "../types/cartItem";
// import type { CartItem } from "../types/cart";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  disabled?: boolean;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
  disabled = false,
}) => {
  const total = item.unit_price * item.quantity;
  const imageFallback = item.image_url ?? "https://via.placeholder.com/150x150?text=No+Image";

  return (
    <div className="grid grid-cols-12 items-center p-4 border-b border-gray-100 last:border-0">
      <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
        <img
          src={item.image_url ?? imageFallback}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
          onError={(event) => {
            event.currentTarget.src = imageFallback;
          }}
        />
        <div>
          <h4 className="font-medium text-gray-800">{item.name}</h4>
          {item.category && (
            <p className="text-sm text-gray-500">{item.category}</p>
          )}
          <button
            onClick={() => onRemove(item.product_id)}
            className="text-red-500 text-sm mt-1 hover:text-red-700 flex items-center disabled:opacity-50"
            disabled={disabled}
          >
            🗑 Remove
          </button>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 text-gray-700 text-center mb-4 md:mb-0">
        ${item.unit_price.toFixed(2)}
      </div>

      <div className="col-span-4 md:col-span-3 flex items-center justify-center mb-4 md:mb-0">
        <button
          onClick={() => onQuantityChange(item.product_id, -1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
          disabled={disabled}
        >
          -
        </button>
        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => onQuantityChange(item.product_id, 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50"
          disabled={disabled}
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
