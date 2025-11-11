import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { api } from "../../../lib/axiosInstance";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
    staleTime:1000*60*5
  });
