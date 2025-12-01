export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  sku: string;
  stockActual: number;
  stockMinimo: number;
  stockStatus: "normal" | "low_stock" | "out_of_stock";
}
