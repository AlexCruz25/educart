import { useState, useMemo } from "react";
import type { CartItem } from "../types/cartItem";
import { CartItemCard } from "../components/CartItem";
import { OrderSummary } from "../components/OrderSummary";


// Simulación temporal de productos en carrito
const mockCart: CartItem[] = [
  {
    id: 1,
    title: "Advanced Mathematics Textbook",
    price: 49.99,
    quantity: 2,
    image: "/src/assets/1.webp",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(mockCart);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
            : item
        )
        .filter((i) => i.quantity > 0)
    );
    // TODO: PATCH /cart/{id} {quantity: newValue}
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    // TODO: DELETE /cart/{id}
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🧾 Lista de productos */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Encabezado solo en desktop */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-300 text-6xl mb-4"></div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Looks like you haven't added anything yet.
                </p>
                <a
                  href="/products"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Browse Products
                </a>
              </div>
            )}
          </div>
        </div>

        
        <div className="lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </main>
  );
}
