import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { api } from "../../../lib/axiosInstance";

type ApiProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
  rating?: number;
};

const FALLBACK_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

const mapProduct = (product: ApiProduct): Product => ({
  id: product.id,
  title: product.name,
  category: product.category ?? "General",
  price: product.price,
  image: product.image_url || FALLBACK_IMAGE,
});


export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<ApiProduct[]>("/products/");
      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida del servicio de productos");
      }
      return data.map(mapProduct);
    },
    staleTime: 1000 * 60 * 5,

  });
