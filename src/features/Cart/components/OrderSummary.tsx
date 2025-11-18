import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  taxes: number;
  total: number;
  onCheckout: () => void;
  isProcessing?: boolean;
  disabled?: boolean;
  helperText?: string | null;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  taxes,
  total,
  onCheckout,
  isProcessing = false,
  disabled = false,
  helperText,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium">${taxes.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled || isProcessing}
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </button>

      {helperText && (
        <p className="text-xs text-gray-500 text-center">{helperText}</p>
      )}

      <p className="text-sm text-gray-500 text-center mt-4">or</p>

      <a
        href="/products"
        className="block text-center mt-3 text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Continue Shopping
      </a>
    </div>
  );
};
