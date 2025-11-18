import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import type { CartItem } from "../types/cartItem";
import { CartItemCard } from "../components/CartItem";
import { OrderSummary } from "../components/OrderSummary";
import {
  useCartSummary,
  useCheckoutCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../hooks/useCart";
import { useAppSelector } from "../../../store/hook";

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [feedback, setFeedback] = useState<string | null>(null);

const { data: summary, isFetching } = useCartSummary({ enabled: isAuthenticated });
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const checkout = useCheckoutCart();

const handleQuantityChange = async (productId: number, delta: number) => {
    if (!summary) return;
    const current = summary.items.find((item) => item.product_id === productId);
    if (!current) return;

  const nextQuantity = current.quantity + delta;

  try {
      if (nextQuantity <= 0) {
        await removeItem.mutateAsync(productId);
        setFeedback("Producto eliminado del carrito");
      } else {
        await updateItem.mutateAsync({ productId, quantity: nextQuantity });
        setFeedback("Cantidad actualizada");
      }
    } catch (error) {
      const detail =
        error instanceof AxiosError
          ? (error.response?.data as { detail?: string })?.detail
          : null;
      setFeedback(detail ?? "No se pudo actualizar el carrito");
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await removeItem.mutateAsync(productId);
      setFeedback("Producto eliminado del carrito");
    } catch (error) {
      const detail =
        error instanceof AxiosError
          ? (error.response?.data as { detail?: string })?.detail
          : null;
      setFeedback(detail ?? "No se pudo eliminar el producto");
    }
  };

  const handleCheckout = async () => {
    if (!summary || summary.items.length === 0) {
      setFeedback("Tu carrito está vacío");
      return;
    }
    try {
      const response = await checkout.mutateAsync();
      setFeedback(response.detail);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate("/login", { state: { from: location } });
        return;
      }
      const detail =
        error instanceof AxiosError
          ? (error.response?.data as { detail?: string })?.detail
          : null;
      setFeedback(detail ?? "No se pudo procesar el checkout");
    }
  };

  const subtotal = useMemo(() => summary?.subtotal ?? 0, [summary]);
  const taxes = useMemo(() => summary?.taxes ?? 0, [summary]);
  const total = useMemo(() => summary?.total ?? 0, [summary]);

  if (!isAuthenticated) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-700 mb-4">
            Your cart is waiting
          </h1>
          <p className="text-gray-600 mb-6">
            Necesitas iniciar sesión para ver y administrar tu carrito.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login", { state: { from: location } })}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </main>
    );
  }

  const hasItems = (summary?.items.length ?? 0) > 0;

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

            {hasItems ? (
              summary?.items.map((item: CartItem) => (
                <CartItemCard
                  key={item.product_id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  disabled={
                    isFetching || updateItem.isPending || removeItem.isPending
                  }
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
            taxes={taxes}
            total={total}
            onCheckout={handleCheckout}
            isProcessing={checkout.isPending}
            disabled={!hasItems}
            helperText={feedback}
          />
        </div>
      </div>
    </main>
  );
}
