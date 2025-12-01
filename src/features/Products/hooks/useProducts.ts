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
  sku: string;
  stock_actual: number;
  stock_minimo: number;
  stock_status: "normal" | "low_stock" | "out_of_stock";
};

const FALLBACK_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

const mapProduct = (product: ApiProduct): Product => ({
  id: product.id,
  title: product.name,
  category: product.category ?? "General",
  price: product.price,
  image: product.image_url || FALLBACK_IMAGE,
  description: product.description,
  rating: product.rating,
  sku: product.sku,
  stockActual: product.stock_actual,
  stockMinimo: product.stock_minimo,
  stockStatus: product.stock_status,
});

export interface ProductFilters {
  category?: string;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "rating_desc";
}

export const useProducts = (filters: ProductFilters = {}) =>
  useQuery<Product[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (filters.category) params.category = filters.category;
      if (filters.maxPrice && filters.maxPrice > 0) params.max_price = filters.maxPrice;
      if (filters.minRating && filters.minRating > 0) params.min_rating = filters.minRating;
      if (filters.search) params.search = filters.search;
      if (filters.sortBy) params.sort_by = filters.sortBy;

      const { data } = await api.get<ApiProduct[]>("/products", { params });
      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida del servicio de productos");
      }
      return data.map(mapProduct);
    },
    staleTime: 1000 * 60 * 5,

  });
