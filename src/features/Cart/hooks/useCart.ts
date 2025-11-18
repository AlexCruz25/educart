import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../../lib/axiosInstance";
import type { CartSummary } from "../types/cartItem";

const EMPTY_SUMMARY: CartSummary = {
  items: [],
  subtotal: 0,
  taxes: 0,
  total: 0,
};

export const CART_QUERY_KEY = ["cart", "summary"] as const;

export const useCartSummary = (options?: { enabled?: boolean }) =>
  useQuery<CartSummary>({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      try {
        const { data } = await api.get<CartSummary>("/cart/summary");
        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          return EMPTY_SUMMARY;
        }
        throw error;
      }
    },
    initialData: EMPTY_SUMMARY,
    staleTime: 1000 * 30,
    enabled: options?.enabled ?? true,
  });

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const { data } = await api.post<CartSummary>("/cart/items", {
        product_id: productId,
        quantity,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const { data } = await api.put<CartSummary>(`/cart/items/${productId}`, {
        quantity,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const { data } = await api.delete<CartSummary>(`/cart/items/${productId}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};

export const useCheckoutCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{ detail: string; summary: CartSummary }>(
        "/cart/checkout"
      );
      return data;
    },
    onSuccess: ({ summary }) => {
      queryClient.setQueryData(CART_QUERY_KEY, summary);
    },
  });
};